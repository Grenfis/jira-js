import IArgs from './IArgs';
import IResult from "./IResult";

interface IScreen {
    run(args: IArgs): Promise<IResult>;
}

export default IScreen;