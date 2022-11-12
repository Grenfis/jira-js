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
            this.exit();
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
                    this.exit();
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

    }

    private exit(): boolean {
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