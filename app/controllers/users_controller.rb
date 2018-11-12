# frozen_string_literal: true

class UsersController < ApplicationController
  def create
    if params[:password] != params[:confirm_password]
      render json: { 'error' => 'Passwords do not match' }.to_json
      return
    end
    if User.find_by(email: params[:email])
      render json: { 'error' => 'Email is already registered' }.to_json
      return
    end

    @user = User.new do |u|
      u.email = params[:email]
      u.password = params[:password]
      u.first_name = params[:first_name]
      u.last_name = params[:last_name]
    end

    if @user.save
      UserMailer.with(user: @user).welcome_email.deliver_later
      render json: { 'error' => 'You have been sent a letter. Confirm email' }.to_json
    else
      render json: { 'error' => 'Not registrated. Check the data' }.to_json
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
