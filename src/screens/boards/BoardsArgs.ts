import IArgs from "../IArgs";
import {Widgets} from "blessed";
import AllBoardsDto from "../../jira/dto/AllBoardsDto";

class BoardsArgs implements IArgs {
    public readonly screen: Widgets.Screen;
    public readonly boards: AllBoardsDto

    constructor(screen: Widgets.Screen, boards: AllBoardsDto) {
        this.screen = screen;
        this.boards = boards;
    }
}

export default BoardsArgs;