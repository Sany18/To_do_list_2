require 'rails_helper'

RSpec.describe TasksController, type: :controller do
  let!(:application) { Doorkeeper::Application.create!(name: "x2", redirect_uri: "https://localhost:3000") }
  let(:user){ create :user }
  let(:user_2){ create :user }
  let!(:access_token) { Doorkeeper::AccessToken.create! application_id: application.id, resource_owner_id: user.id, scopes: "app" }

  before(:each) do
    allow(controller).to receive(:doorkeeper_token) { access_token }
  end

  # GET /tasks
  context "#index" do
    let!(:user_task) { create(:task, user_id: user.id) }
    let!(:not_user_task) { create(:task, user_id: user_2.id) }

    before do
      get :index
    end
    it { expect(assigns(:tasks).last).to eq(user_task) }
    it { expect(assigns(:tasks).first).to eq(user_task) }
    it { expect(assigns(:tasks).last).not_to eq(not_user_task) }
    it { expect(response).to have_http_status(200) }
  end

  # GET /task/:id
  context "#show" do
    let(:task) {create(:task, user_id: user.id)}

    before do
      get :show, params: {id: task.id}
    end

    it {expect(assigns(:task)).to eq(task)}
    it {expect(response).to have_http_status(200)}
  end

  # POST /task
  context "#create" do
    let(:current_task) {build(:task)}
    let(:params) {{task: current_task.attributes}}

    before do
      post :create, params: params
    end

    it { expect(response.body).to eq('{"error":"Task created"}') }
    it { expect(assigns(:task).title).to eq(current_task.title) }
    it { expect(assigns(:task).theme).to eq(current_task.theme) }
  end

  # PATCH/PUT /task/:id
  context "#update" do
    let(:task_1) {create(:task, user_id: user.id)}
    let(:task_2) {build(:task, user_id: user.id)}
    let(:params) {{id: task_1.id, task: task_2.attributes}}

    before do
      put :update, params: params
    end

    it { expect(response.body).to eq('{"error":"Task updated"}') }
    it { expect(assigns(:task).title).to eq(task_2.title) }
    it { expect(assigns(:task).theme).to eq(task_2.theme) }
  end

  # DELETE /task/:id
  context "#destroy" do
    let(:task) {create(:task, user_id: user.id)}

    before do
      delete :destroy, params: {id: task.id}
    end

    it { expect(Task.find_by(id: task.id)).to be_nil }
    it { expect(response.body).to eq('{"error":"Task was deleted"}') }
  end
end