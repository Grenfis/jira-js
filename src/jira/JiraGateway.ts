import {AgileClient} from 'jira.js';
import Config from "../config/Config";

class JiraGateway {
    private readonly client: AgileClient;

    public constructor(config: Config) {
        this.client = new AgileClient({
            host: config.jira.host,
            authentication: {
                basic: {
                    email: config.jira.email,
                    apiToken: config.jira.apiToken,
                },
            },
            newErrorHandling: true,
        });
    }
}

export default JiraGateway;