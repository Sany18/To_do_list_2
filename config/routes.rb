# frozen_string_literal: true

Rails.application.routes.draw do
  use_doorkeeper do
    controllers tokens: 'dk_tokens'
  end
  resources :tasks
  root 'tasks#index'
  delete '/tasks/delete_selected/:id' => 'custom#destroy_selected'
  get '/tasks/status_switch/:id' => 'custom#status_switch'
  post '/user/create/' => 'users#create'
  get 'confirmations/:token' => 'confirmations#create', as: 'confirmations'
end
