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

	# def create
	# 	@user = User.new(params[:user])
	# 	@user.password = params[:password]
	# 	@user.save!
	# end

	def login
		@user = User.find_by_email(params[:email])
		if @user.password == params[:password]
			give_token
		else
			redirect_to home_url
		end
	end

	def destroy
		session.delete(:user_id)
		render json: @user.errors, status: 'Session destroyed'
	end
end