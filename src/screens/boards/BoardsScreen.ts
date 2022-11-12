import IScreen from "../IScreen";
import BoardsArgs from "./BoardsArgs";
import BoardsResult from "./BoardsResult";
import blessed, {Widgets} from "blessed";
import BlessedElement = Widgets.BlessedElement;

class BoardsScreen implements IScreen {
    run(args: BoardsArgs): Promise<BoardsResult> {
        return new Promise<BoardsResult>((resolve, reject) => {
            const screen = args.screen;

            let list = blessed.list({
                parent: screen,
                top: 0,
                left: 'center',
                shrink: true,
                keys: true,
                border: {
                    type: 'line'
                },
                style: {
                    selected: {
                        fg: 'blue',
                    }
                }
            });

            args.boards.values.forEach(board => {
                list.addItem(board.name + ' - ' + board.type);
            });

            list.on('select', item => {
                resolve({
                    boardId: args.boards.values[item.index - 1].id,
                });
            })

            screen.render();
        });
    }
}

export default BoardsScreen;