import IResult from "../IResult";

class BoardsResult implements IResult {
    public readonly boardId: number;

    constructor(boardId: number) {
        this.boardId = boardId;
    }
}

export default BoardsResult;