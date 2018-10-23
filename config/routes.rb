Rails.application.routes.draw do
  use_doorkeeper
  resources :tasks
  root 'tasks#index'
  delete '/task/delete_selected/:id' => 'custom#destroy_selected'
  get '/task/status_switch/:id' => 'custom#status_switch'
end