import IArgs from "../IArgs";
import {Widgets} from "blessed";
import QuickFilter from "../../jira/dto/QuickFilter";
import TaskDto from "../../jira/dto/TaskDto";

class TasksArgs implements IArgs {
    public readonly screen: Widgets.Screen;
    public readonly filters: QuickFilter[];
    public readonly activeFilters: QuickFilter[];
    public readonly todoTasks: TaskDto[];
    public readonly inProgressTasks: TaskDto[];
    public readonly doneTasks: TaskDto[];

    constructor(screen: Widgets.Screen, filters: QuickFilter[], activeFilters: QuickFilter[], todoTasks: TaskDto[], inProgressTasks: TaskDto[], doneTasks: TaskDto[]) {
        this.screen = screen;
        this.filters = filters;
        this.activeFilters = activeFilters;
        this.todoTasks = todoTasks;
        this.inProgressTasks = inProgressTasks;
        this.doneTasks = doneTasks;
    }
}

export default TasksArgs;