# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :password_digest

      t.datetime :confirmed_at
      t.datetime :confirmation_sent_at
      t.string :confirmation_token
      t.boolean :email_confirmed, default: false

      t.timestamps
    end
  end
end
