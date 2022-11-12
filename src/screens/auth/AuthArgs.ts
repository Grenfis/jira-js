import IArgs from "../IArgs";
import {Widgets} from "blessed";

class AuthArgs implements IArgs {
    public readonly screen: Widgets.Screen;

    public constructor(screen: Widgets.Screen) {
        this.screen = screen;
    }
}

export default AuthArgs;