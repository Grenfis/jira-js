class TaskStatusCategoryDto {
    public readonly id: number;
    public readonly name: string;
    public readonly key: string;

    constructor(id: number, name: string, key: string) {
        this.id = id;
        this.name = name;
        this.key = key;
    }
}

enum Statuses {
    todo = 2,
    done,
    inProgress,
}

export {
    TaskStatusCategoryDto,
    Statuses
}