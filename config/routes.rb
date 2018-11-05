Rails.application.routes.draw do
	use_doorkeeper 
	resources :tasks
	root 'tasks#index'
	delete '/tasks/delete_selected/:id' => 'custom#destroy_selected'
	get '/tasks/status_switch/:id' => 'custom#status_switch'
	post '/user/create/' => 'user#create'
end