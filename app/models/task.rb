# frozen_string_literal: true

class Task < ApplicationRecord
  belongs_to :user

  validates_presence_of :title, :theme

  def user_name
    user = User.find_by_id(user_id)
    user ? user.first_name + ' ' + user.last_name : ''
  end
end
