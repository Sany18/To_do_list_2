class User < ApplicationRecord
	has_secure_password
	has_many :tasks

	validates_presence_of :first_name, :last_name, :email

	has_many :access_grants, class_name: "Doorkeeper::AccessGrant", foreign_key: :resource_owner_id, dependent: :delete_all
	has_many :access_tokens, class_name: "Doorkeeper::AccessToken", foreign_key: :resource_owner_id, dependent: :delete_all
	has_many :oauth_applications, class_name: 'Doorkeeper::Application', as: :owner
end
