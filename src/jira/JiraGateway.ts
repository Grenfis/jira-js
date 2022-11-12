import {AgileClient} from 'jira.js';
import Config from "../config/Config";
import AllBoardsDto from "./dto/AllBoardsDto";
import QuickFilter from "./dto/QuickFilter";
import TaskDto from "./dto/TaskDto";

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

    public getAllTasks(boardId: number, filterJql?: string): Promise<TaskDto[]> {
        return this.client.board.getIssuesForBoard({
            boardId: boardId,
            jql: filterJql,
        }).then((tasks): TaskDto[] => {
            return tasks.issues.map((issue): TaskDto => {
                return {
                    id: issue.id ?? '',
                    key: issue.key ?? '',
                    summary: issue.fields?.summary ?? '',
                    category: {
                        id: issue.fields?.status?.statusCategory.id,
                        key: issue.fields?.status?.statusCategory.key,
                        name: issue.fields?.status?.statusCategory.name,
                    }
                }
            });
        });
    }
}

export default JiraGateway;