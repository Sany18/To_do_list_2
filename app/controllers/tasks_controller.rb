class TasksController < ApplicationController
  before_action :doorkeeper_authorize!
  before_action :set_task, only: [:show, :edit, :update, :destroy]

  # GET /tasks
  def index
    @tasks = current_user.tasks
    render json: @tasks
  end

  # GET /tasks/1
  def show
    render json: @task
  end

  # POST /tasks
  def create
    @task = current_user.tasks.new(task_params)

    if @task.save
      render json: { 'error' => 'Task created' }.to_json
    else
      render json: { 'error' => 'Unable to save!' }.to_json
    end
  end

  # PATCH/PUT /tasks/1
  def update
    if @task.update(task_params)
      render json: { 'error' => 'Task updated' }.to_json
    else
      render json: { 'error' => 'Unable to update!' }.to_json
    end
  end

  # DELETE /tasks/1
  def destroy
    if @task.destroy
      render json: { 'error' => 'Task was deleted' }.to_json
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = current_user.tasks.find_by(id: params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def task_params
      params.require(:task).permit(:title, :theme, :priority, :due_date, :is_done?)
    end
  end
