# frozen_string_literal: true

Rails.application.routes.draw do
  use_doorkeeper do
    controllers tokens: 'dk_tokens'
  end

  resources :tasks
  root 'tasks#index'
  delete '/tasks/delete_selected/:id' => 'custom#destroy_selected'
  delete '/tasks/remuve_images/:id' => 'tasks#remuve_images'
  post '/tasks/status_switch/' => 'custom#status_switch'
  post '/user/create/' => 'users#create'
  get 'confirmations/:token' => 'confirmations#create', as: 'confirmations'

  # react
  get '*path' => 'custom#render_react_app'
end
