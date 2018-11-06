import tableComponents from "./table";
import advancedSearchGroups from "./advanced-search-groups";

const install = Vue => {
	Vue.use(tableComponents);
	Vue.component(advancedSearchGroups.name, advancedSearchGroups);
};

export default {
	install
};
