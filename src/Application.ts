import blessed from "blessed";

import JiraGateway from "./jira/JiraGateway";
import Config from "./config/Config";
import AuthScreen from "./screens/auth/AuthScreen";
import AuthArgs from "./screens/auth/AuthArgs";
import AuthResult from "./screens/auth/AuthResult";
import AuthActions from "./screens/auth/AuthActions";
import BoardsArgs from "./screens/boards/BoardsArgs";
import BoardsScreen from "./screens/boards/BoardsScreen";
import BoardsResult from "./screens/boards/BoardsResult";
import TasksArgs from "./screens/tasks/TasksArgs";
import TasksScreen from "./screens/tasks/TasksScreen";
import TasksResult from "./screens/tasks/TasksResult";
import TasksActions from "./screens/tasks/TasksActions";
import QuickFilter from "./jira/dto/QuickFilter";
import {Statuses as TaskStatusCategory} from "./jira/dto/TaskStatusCategoryDto";

class Application {
    private config?: Config;
    private jiraGateway?: JiraGateway;

    private readonly screen: blessed.Widgets.Screen;

    public constructor() {
        this.screen = blessed.screen({
            smartCSR: true,
            title: 'jira-js',
        });

        this.screen.key(['escape', 'q'], (ch, key) => {
            Application.exit();
        });
    }

    public static async init(): Promise<void> {
        let app: Application = new Application();
        await app.run();
    }

    private async run() {
        const config = await this.getConfig();
        if (config.jira.apiToken.length === 0)
        {
            await this.authScreen();
        } else {
            await this.boardsScreen();
        }
    }

    private async authScreen() {
        const config = await this.getConfig();
        let args: AuthArgs = {screen: this.screen};
        (new AuthScreen()).run(args)
            .then((result: AuthResult) => {
                if (result.action === AuthActions.AUTH) {
                    config.jira.host = result.host;
                    config.jira.email = result.email;
                    config.jira.apiToken = result.apiToken;
                    config.save();

                    this.boardsScreen();
                } else {
                    Application.exit();
                }
            });
    }

    private async boardsScreen() {
        const config = await this.getConfig();
        const jiraGateway = await this.getJiraGateway();

        if (config.user.preferredBoard > 0) {
            return await this.tasksScreen();
        }

        const allBoards = await jiraGateway.getAllBoards();
        const args: BoardsArgs = {
            screen: this.screen,
            boards: allBoards,
        };

        (new BoardsScreen()).run(args)
            .then((result: BoardsResult) => {
                config.user.preferredBoard = result.boardId;
                config.save();

                this.tasksScreen();
            });
    }

    private async tasksScreen() {
        const config = await this.getConfig();
        const jiraGateway = await this.getJiraGateway();
        const filters = await jiraGateway.getQuickFilters(config.user.preferredBoard);

        let run = true;
        while(run) {
            const activeFilters: QuickFilter[] = config.user.activeTasksFilters.map(id => {
                return filters.find(filter => {
                    return filter.id === id;
                }) ?? new QuickFilter(0, '', '');
            });

            const filterString = activeFilters.map(filter => {
                return filter.jql;
            }).join(' and ');
            const tasks = await jiraGateway.getAllTasks(config.user.preferredBoard, filterString);
            const todoTasks = tasks.filter(task => task.category.id === TaskStatusCategory.todo);
            const inProgressTasks = tasks.filter(task => task.category.id === TaskStatusCategory.inProgress);
            const doneTasks = tasks.filter(task => task.category.id === TaskStatusCategory.done);

            const args: TasksArgs = {
                screen: this.screen,
                filters: filters,
                activeFilters: activeFilters,
                todoTasks: todoTasks,
                inProgressTasks: inProgressTasks,
                doneTasks: doneTasks,
            };

            run = await (new TasksScreen()).run(args)
                .then((result: TasksResult) => {
                    switch (result.action) {
                        case TasksActions.ApplyFilter:
                            if (result.filterId !== undefined) {
                                if (config.user.activeTasksFilters.findIndex(id => id === result.filterId) < 0) {
                                    config.user.activeTasksFilters.push(result.filterId);
                                    config.save();
                                }
                                return true;
                            }
                            break;
                        case TasksActions.RemoveFilter:
                            if (result.filterId !== undefined) {
                                if (config.user.activeTasksFilters.findIndex(id => id === result.filterId) >= 0) {
                                    config.user.activeTasksFilters = config.user.activeTasksFilters.filter(id => id !== result.filterId);
                                    config.save();
                                }
                                return true;
                            }
                            break;
                    }
                    return false;
                });
        }
    }

    private static exit(): boolean {
        return process.exit(0);
    }

    private async getConfig(): Promise<Config> {
        if (this.config === undefined) {
            this.config = await Config.init();
        }
        return this.config;
    }

    private async getJiraGateway(): Promise<JiraGateway> {
        if (this.jiraGateway === undefined) {
            this.jiraGateway = await this.getConfig().then(config => new JiraGateway(config));
        }
        return this.jiraGateway;
    }
}

export default Application;