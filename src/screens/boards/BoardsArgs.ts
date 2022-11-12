import IArgs from "../IArgs";
import {Widgets} from "blessed";

class BoardsArgs implements IArgs {
    public readonly screen: Widgets.Screen;

    constructor(screen: Widgets.Screen) {
        this.screen = screen;
    }
}

export default BoardsArgs;