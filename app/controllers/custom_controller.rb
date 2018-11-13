# frozen_string_literal: true

class CustomController < ApplicationController
  before_action :doorkeeper_authorize!

  # DELETE /task/delete_selected/:id
  def destroy_selected
    if current_user.tasks.where(id: params[:id].split('&')).destroy_all
      render json: { 'error' => 'Tasks was deleted' }.to_json
    else
      render json: { 'error' => 'Error' }.to_json
    end
  end

  # GET /task/status_switch/:id
  def status_switch
    @task = current_user.tasks.find_by(id: params[:id])
    if @task.update(is_done?: !@task.is_done?)
      render json: { 'error' => 'Chenged' }.to_json
    else
      render json: { 'error' => 'Error' }.to_json
    end
  end
end
