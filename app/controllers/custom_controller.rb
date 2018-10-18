class CustomController < ApplicationController
  before_action :authenticate_user!
  before_action :set_task, only: [:show, :edit, :update, :destroy]

# DELETE /task/delete_selected/:id
  def destroy_selected
    current_user.tasks.where(id: params[:id].split("&")).destroy_all
  end

  #GET /task/status_switch/:id
  def status_switch
    @task = current_user.tasks.find_by(id: params[:id])
    @task.update(is_done: !@task.is_done)

    respond_to do |format|
      format.html {redirect_to "/", notice: "Changed."}
      format.json {head :no_content}
    end
  end