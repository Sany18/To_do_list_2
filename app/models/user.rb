# frozen_string_literal: true

class User < ApplicationRecord
  before_create :set_token

  has_secure_password
  has_many :tasks

  validates_presence_of :first_name, :last_name, :email

  has_many :access_grants, class_name: 'Doorkeeper::AccessGrant', foreign_key: :resource_owner_id, dependent: :delete_all
  has_many :access_tokens, class_name: 'Doorkeeper::AccessToken', foreign_key: :resource_owner_id, dependent: :delete_all
  has_many :oauth_applications, class_name: 'Doorkeeper::Application', as: :owner

  def mark_as_confirmed!
    self.email_confirmed = true
    self.confirmation_token = nil
    self.confirmed_at = Time.now.utc
    save(validate: false)
  end

  def confirmed_email?
    email_confirmed
  end

  private

  def set_token
    self.confirmation_token = SecureRandom.urlsafe_base64.to_s
    self.confirmation_sent_at = Time.now.utc
  end
end
