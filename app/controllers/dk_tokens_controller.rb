class DkTokensController < Doorkeeper::TokensController
  # Overriding create action
  # POST /oauth/token
  def create
    if authorize_response.respond_to?(:token)
      current_user = User.find(authorize_response.token.resource_owner_id)
    else
      current_user = nil
    end

    puts authorize_response.to_s
    if current_user && current_user.confirmed_email?
      response = authorize_response
      headers.merge! response.headers
      self.response_body = response.body.to_json
      self.status = response.status
    elsif !current_user
      render json: { 'error' => 'Not validated data' }.to_json
    else
      render json: { 'error' => 'Check your mailbox. Email not confirmed' }.to_json
    end
  end
end