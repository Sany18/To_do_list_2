class UserMailer < ApplicationMailer
	default from: 'notifications@example.com'

	def welcome_email
		@user = params[:user]
		@url  = 'http://heroku.com'
		# mail(to: @user.email, subject: 'Welcome to My Awesome Site')
		mail(to: @user.email, subject: 'Welcome to My Awesome Site #{@user.first_name}')
	end
end