# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    email { Faker::Internet.email }
    password { 'password' }
  end

  factory :task do
    title { Faker::Job.title }
    theme { Faker::Hacker.say_something_smart }
    priority { rand(0..5) }
    due_date { Date.today }
  end
end
