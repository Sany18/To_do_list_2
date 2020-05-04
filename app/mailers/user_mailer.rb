# frozen_string_literal: true

class UserMailer < ApplicationMailer
  default from: 'alex.t@milestep.io'

  def welcome_email
    @user = params[:user]
    @url  = 'http://heroku.com'
    mail(to: @user.email, subject: "Welcome to My Awesome Site #{@user.first_name}")
  end
end
