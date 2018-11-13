import vars from './global-variables'

let routes = {
	root: vars.API,
	tasksGet: vars.API + '/tasks',
	taskCreatePost: vars.API + '/tasks/',
	taskShowGet: vars.API + '/tasks/',
	taskUpdatePut: vars.API + '/tasks/',
	taskUpdatePatch: vars.API + '/tasks/',
	taskDelete: vars.API + '/tasks/',
	deleteSelected: vars.API + '/tasks/delete_selected/',
	statusSwitchPOST: vars.API + '/tasks/status_switch/',
	oauthTokenPOST: vars.API +  '/oauth/token/',
	userCreatePOST: vars.API + '/user/create/'
}

export default routes;