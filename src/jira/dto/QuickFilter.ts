class QuickFilter {
    public readonly id: number;
    public readonly jql: string;
    public readonly name: string;

    constructor(id: number, jql: string, name: string) {
        this.id = id;
        this.jql = jql;
        this.name = name;
    }
}

export default QuickFilter;