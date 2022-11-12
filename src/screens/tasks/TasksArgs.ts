import IArgs from "../IArgs";
import {Widgets} from "blessed";
import QuickFilter from "../../jira/dto/QuickFilter";

class TasksArgs implements IArgs {
    public readonly screen: Widgets.Screen;
    public readonly filters: QuickFilter[];
    public readonly activeFilters: QuickFilter[];

    constructor(screen: Widgets.Screen, filters: QuickFilter[], activeFilters: QuickFilter[]) {
        this.screen = screen;
        this.filters = filters;
        this.activeFilters = activeFilters;
    }
}

export default TasksArgs;