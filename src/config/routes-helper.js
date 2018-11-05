import vars from './global-variables'

let routes = {
	root: vars.API,
	tasksGet: vars.API + '/tasks',
	taskCreatePost: vars.API + '/tasks/',
	taskShowGet: vars.API + '/tasks/',
	taskUpdatePut: vars.API + '/tasks/',
	taskUpdatePatch: vars.API + '/tasks/',
	taskDelete: vars.API + '/tasks/',
	deleteSelected: vars.API + '/task/delete_selected/',
	statusSwitchGet: vars.API + '/task/status_switch/',
	oauthTokenPOST: vars.API +  '/oauth/token/',
	userCreatePOST: vars.API + '/user/create/'
}

export default routes;