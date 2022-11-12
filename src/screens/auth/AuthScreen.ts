import IScreen from "../IScreen";
import AuthArgs from "./AuthArgs";
import AuthResult from "./AuthResult";
import blessed from "blessed";
import AuthActions from "./AuthActions";

class AuthScreen implements IScreen {
    public constructor() {
    }

    run(args: AuthArgs): Promise<AuthResult> {
        return new Promise((resolve, reject) => {
            let screen = args.screen;

            let authForm = blessed.form({
                parent: screen,
                top: 'center',
                left: 'center',
                shrink: true,
                keys: true,
                mouse: true,
                border: {
                    type: 'line'
                },
                style: {
                    fg: 'white',
                    border: {
                        fg: '#f0f0f0'
                    },
                }
            });

            //================HOST====================
            blessed.text({
                parent: authForm,
                top: 0,
                left: 0,
                content: 'host',
            });

            let hostInput = blessed.textbox({
                parent: authForm,
                name: 'host',
                top: 1,
                left: 0,
                height: 3,
                inputOnFocus: true,
                content: '',
                border: {
                    type: 'line',
                },
            });
            //===============EMAIL======================
            blessed.text({
                parent: authForm,
                top: 4,
                left: 0,
                content: 'email',
            });

            let emailInput = blessed.textbox({
                parent: authForm,
                name: 'email',
                top: 5,
                left: 0,
                height: 3,
                inputOnFocus: true,
                content: '',
                border: {
                    type: 'line',
                },
            });
            //================API_TOKEN======================
            blessed.text({
                parent: authForm,
                top: 8,
                left: 0,
                content: 'Api Token',
            });

            let apiTokenInput = blessed.textbox({
                parent: authForm,
                name: 'api_token',
                top: 9,
                left: 0,
                height: 3,
                inputOnFocus: true,
                content: '',
                border: {
                    type: 'line',
                },
            });
            //================AUTH_BUTTON======================
            let authButton = blessed.button({
                parent: authForm,
                name: 'auth_button',
                top: 12,
                left: 0,
                width: 15,
                height: 3,
                content: 'Auth',
                border: {
                    type: 'line',
                },
                style: {
                    focus: {
                        fg: 'white',
                        bg: 'blue',
                    }
                }
            });
            //====================EXIT_BUTTON========================
            let cancelButton = blessed.button({
                parent: authForm,
                name: 'cancel_button',
                top: 12,
                left: 15,
                height: 3,
                width: 15,
                shrink: true,
                content: 'Cancel',
                border: {
                    type: 'line',
                },
                style: {
                    focus: {
                        fg: 'white',
                        bg: 'blue',
                    }
                }
            });
            //=====================================================

            authButton.on('press', () => {
                resolve({
                    host: hostInput.value.trim(),
                    email: emailInput.value.trim(),
                    apiToken: apiTokenInput.value.trim(),
                    action: AuthActions.AUTH,
                });
            });

            cancelButton.on('press', () => {
                resolve({
                    host: '',
                    email: '',
                    apiToken: '',
                    action: AuthActions.EXIT,
                });
            });

            hostInput.focus();

            screen.render();
        });
    }
}

export default AuthScreen;