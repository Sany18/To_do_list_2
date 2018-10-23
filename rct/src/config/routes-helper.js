const API = 'http://localhost:3000';

let routes = {
	root: API,
	tasksGet: API + '/tasks',
	taskCreatePost: API + '/tasks/',
	taskShowGet: API + '/tasks/',
	taskUpdatePut: API + '/tasks/',
	taskUpdatePatch: API + '/tasks/',
	taskDelete: API + '/tasks/',
	deleteSelected: API + '/task/delete_selected/',
	statusSwitchGet: API + '/task/status_switch/'
}

export default routes;