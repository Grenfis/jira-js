import Jira from "./Jira";
import User from "./User";
import * as fs from 'node:fs/promises';

const PATH: string = 'config.json';

class Config {
    public jira: Jira
    public user: User;

    constructor() {
        this.jira = new Jira();
        this.user = new User();
    }

    public static async init(): Promise<Config> {
        try {
            await fs.access(PATH, fs.constants.R_OK | fs.constants.W_OK);
            return fs.readFile(PATH)
                .then(buff => {
                    const buffString = buff.toString();
                    const configJson: Object = JSON.parse(buffString);
                    return Object.assign(new Config(), configJson);
                });
        } catch (e) {
            let config: Config = new Config();
            const configStr: string = JSON.stringify(config, null, 2);
            await fs.writeFile(PATH, configStr);
            return config;
        }
    }

    public async save(): Promise<Config> {
        const configStr: string = JSON.stringify(this, null, 2);
        await fs.writeFile(PATH, configStr);
        return this;
    }
}

export default Config;
