# frozen_string_literal: true

class DkTokensController < Doorkeeper::TokensController
  # Overriding create action
  # POST /oauth/token
  def create
    current_user = if authorize_response.respond_to?(:token)
                     User.find(authorize_response.token.resource_owner_id)
                   end

    if current_user&.confirmed_email?
      response = authorize_response
      headers.merge! response.headers
      self.response_body = response.body.to_json
      self.status = response.status
    elsif !current_user
      render json: { 'error' => 'User not found' }.to_json
    else
      render json: { 'message' => 'Check your mailbox. Email not confirmed' }.to_json
    end
  end
end
