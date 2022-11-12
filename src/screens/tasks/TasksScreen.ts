import IScreen from "../IScreen";
import TasksArgs from "./TasksArgs";
import TasksResult from "./TasksResult";
import blessed, {Widgets} from "blessed";
import TasksActions from "./TasksActions";

class TasksScreen implements IScreen {
    run(args: TasksArgs): Promise<TasksResult> {
        return new Promise<TasksResult>((resolve, reject) => {
            const screen = args.screen;

            const filtersList = this.drawFiltersList(args);
            const activeFiltersList = this.drawActiveFiltersList(args);

            filtersList.on('select', item => {
                const index = args.filters.findIndex(filter => {
                    return filter.name === item.content;
                });
                resolve({
                    action: TasksActions.ApplyFilter,
                    filterId: args.filters[index].id,
                });
            });

            activeFiltersList.on('select', item => {
                const index = args.activeFilters.findIndex(filter => {
                    return filter.name === item.content;
                });
                resolve({
                    action: TasksActions.RemoveFilter,
                    filterId: args.activeFilters[index].id
                });
            });

            screen.render();
        });
    }

    private drawFiltersList(args: TasksArgs): Widgets.ListElement {
        const screen = args.screen;

        blessed.text({
            parent: screen,
            top: 0,
            left: 0,
            content: 'Фильтры',
        });

        const filtersList = blessed.list({
            parent: screen,
            top: 1,
            left: 0,
            height: 20,
            width: '20%',
            keys: true,
            mouse: true,
            name: 'filters',
            border: {
                type: 'line'
            },
            style: {
                selected: {
                    fg: 'blue',
                }
            }
        });

        args.filters.forEach(filter => {
            filtersList.addItem(filter.name);
        });

        return filtersList;
    }

    private drawActiveFiltersList(args: TasksArgs): Widgets.ListElement {
        const screen = args.screen;

        blessed.text({
            parent: screen,
            top: 21,
            left: 0,
            content: 'Активные фильтры',
        });

        const activeFiltersList = blessed.list({
            parent: screen,
            top: 22,
            left: 0,
            height: 20,
            width: '20%',
            keys: true,
            mouse: true,
            name: 'active_filters',
            border: {
                type: 'line'
            },
            style: {
                selected: {
                    fg: 'blue',
                }
            }
        });

        args.activeFilters.forEach(filter => {
            activeFiltersList.addItem(filter.name);
        });

        return activeFiltersList;
    }
}

export default TasksScreen;