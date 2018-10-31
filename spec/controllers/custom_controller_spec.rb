require 'rails_helper'

RSpec.describe CustomController, type: :controller do
  let!(:application) { Doorkeeper::Application.create!(name: "x2", redirect_uri: "https://localhost:3000") }
  let(:user){ create :user }
  let(:user_2){ create :user }
  let!(:access_token) { Doorkeeper::AccessToken.create! application_id: application.id, resource_owner_id: user.id, scopes: "app" }

  before(:each) do
    allow(controller).to receive(:doorkeeper_token) { access_token }
  end

 # DELETE /task/delete_selected/:id
  context "#destroy selected" do
    let(:task) {create(:task, user_id: user.id)}
    let(:task_2) {create(:task, user_id: user.id)}
    let(:params) {{id: [task.id, task_2.id] * '&'}}

    before do
      delete :destroy_selected, params: params
    end

    it { expect(Task.find_by(id: task.id)).to be_nil }
    it { expect(Task.find_by(id: task_2.id)).to be_nil }
    it { expect(response.body).to eq('{"error":"Tasks was deleted"}') }
  end

  #GET /task/status_switch/:id
  context "#status_switch" do
    let(:task) {create(:task, user_id: user.id)}

    before do
      get :status_switch, params: {id: task.id}
    end

    it { expect(assigns(:task).is_done?).not_to eq(task.is_done?) }
    it { expect(response.body).to eq('{"error":"Chenged"}') }
  end
end