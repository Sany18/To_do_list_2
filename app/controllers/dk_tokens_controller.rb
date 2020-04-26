# frozen_string_literal: true

class DkTokensController < Doorkeeper::TokensController
  # Overriding create action
  # POST /oauth/token
  def create
    current_user = if authorize_response.respond_to?(:token)
                     User.find(authorize_response.token.resource_owner_id)
                   end

    if current_user&.confirmed_email?
      headers.merge! authorize_response.headers
      response = authorize_response.body.as_json
      response['user_name'] = current_user.full_name
      response['user_id'] = current_user.id

      render json: response, status: :ok
    elsif !current_user
      render json: { 'error' => 'User not found' }.to_json
    else
      render json: { 'message' => 'Check your mailbox. Email not confirmed' }.to_json
    end
  end
end
