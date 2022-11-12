import {AgileClient} from 'jira.js';
import Config from "../config/Config";
import AllBoardsDto from "./dto/AllBoardsDto";
import QuickFilter from "./dto/QuickFilter";

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

    public getAllBoards(): Promise<AllBoardsDto> {
        return this.client.board.getAllBoards()
            .then(boards => {
                return {
                    values: boards.values.map(board => {
                        return {
                            id: board.id,
                            name: board.name ?? '',
                            type: board.type ?? '',
                        }
                    })
                };
            });
    }

    public getQuickFilters(boardId: number): Promise<QuickFilter[]> {
        return this.client.board.getAllQuickFilters({boardId: boardId})
            .then(filters => {
                if (filters.values === undefined) {
                    return [];
                }

                return filters.values?.map(filter => {
                    return {
                        id: filter.id ?? 0,
                        jql: filter.jql ?? '',
                        name: filter.name ?? '',
                    }
                });
            });
    }
}

export default JiraGateway;