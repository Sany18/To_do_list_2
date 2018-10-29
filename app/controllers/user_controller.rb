class UserController < ApplicationController
	def create
		@user = User.find_by(email: params[:email])
		if @user && @user.authenticate(params[:password])
			session[:user_id] = @user.id
			render json: @user
		else
			render json: @user.errors, status: :unprocessable_entity
		end
	end

	def login
		@user = User.find_by_email(params[:email])
		if @user.password == params[:password]
			give_token
			render json: { 'error' => 'Hello #{current_user.first_name}' }.to_json
		else
			redirect_to home_url
		end
	end

	def destroy
		session.delete(:user_id)
		render json: @user.errors, status: 'Session destroyed'
	end
end