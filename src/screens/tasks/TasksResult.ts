import IResult from "../IResult";
import TasksActions from "./TasksActions";

class TasksResult implements IResult {
    public readonly action: TasksActions;
    public readonly filterId?: number;

    constructor(action: TasksActions, filterId: number) {
        this.action = action;
        this.filterId = filterId;
    }
}

export default TasksResult;