import BasePage from './basePage';
import ConfigColumnGrid from './configColumnGrid';
import ConfigSlot from "./configSlot";
import ScrollArea from './scrollArea';
import ScrollItem from './scrollItem';
import SearchForm from './searchForm';
import Toolbar from './toolbar';
import TreeTable from './treeTable';
import TreeTableColumn from './treeTableColumn';

let components = [
    BasePage, ConfigColumnGrid, ConfigSlot, ScrollArea, ScrollItem, SearchForm, Toolbar, TreeTable, TreeTableColumn
];

export default {
    install(Vue) {
        components.forEach((item) => {
            Vue.component(item.name, item);
        })
    }
}