import IResult from "../IResult";
import AuthActions from "./AuthActions";

class AuthResult implements IResult {
    public readonly host: string;
    public readonly email: string;
    public readonly apiToken: string;
    public readonly action: AuthActions;

    constructor(host: string, email: string, apiToken: string, action: AuthActions) {
        this.host = host;
        this.email = email;
        this.apiToken = apiToken;
        this.action = action;
    }
}

export default AuthResult;