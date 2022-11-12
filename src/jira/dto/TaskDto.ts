import {TaskStatusCategoryDto} from "./TaskStatusCategoryDto";

class TaskDto {
    public readonly id: string;
    public readonly key: string;
    public readonly summary: string;
    public readonly category: TaskStatusCategoryDto

    constructor(id: string, key: string, summary: string, category: TaskStatusCategoryDto) {
        this.id = id;
        this.key = key;
        this.summary = summary;
        this.category = category;
    }
}

export default TaskDto;