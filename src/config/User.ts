class User {
    public preferredBoard: number;
    public activeTasksFilters: number[];

    constructor() {
        this.preferredBoard = 0;
        this.activeTasksFilters = [];
    }
}

export default User;