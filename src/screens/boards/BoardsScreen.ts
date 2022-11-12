import IScreen from "../IScreen";
import BoardsArgs from "./BoardsArgs";
import BoardsResult from "./BoardsResult";

class BoardsScreen implements IScreen {
    run(args: BoardsArgs): Promise<BoardsResult> {
        return Promise.resolve({

        });
    }
}

export default BoardsScreen;