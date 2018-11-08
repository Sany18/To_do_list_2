class ConfirmationsController < ApplicationController
  def create
    token = params[:token].to_s
    @user = User.find_by(confirmation_token: token)

    if @user.present?
      @user.mark_as_confirmed!
      @status = 'User confirmed successfully'
      render :return_to_root
    else
      @status = 'Invalid token' 
      render :return_to_root
    end
  end
end