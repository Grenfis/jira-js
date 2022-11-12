class AllBoardsDto {
    values: {
        id: number;
        name: string;
        type: string;
    }[];

    constructor(values: { id: number; name: string; type: string }[]) {
        this.values = values;
    }
}

export default AllBoardsDto;