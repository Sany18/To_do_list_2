class DkTokensController < Doorkeeper::TokensController
  # Overriding create action
  # POST /oauth/token
  def create    
    current_user ||= User.find(authorize_response.token.resource_owner_id)
    if current_user.confirmed_email?
      response = authorize_response
      headers.merge! response.headers
      self.response_body = response.body.to_json
      self.status = response.status
    else
      render json: { 'error' => 'Check your mailbox. Email not confirmed' }.to_json
    end
  end
end