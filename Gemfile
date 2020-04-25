# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.1'

gem 'bcrypt'
gem 'bootsnap', '>= 1.1.0', require: false
gem 'devise-jwt'
gem 'doorkeeper'
gem 'figaro'
gem 'jbuilder', '~> 2.5'
gem 'pg'
gem 'puma', '~> 3.11'
gem 'rack-cors', require: 'rack/cors'
gem 'rails', '~> 5.2.1'
gem 'rubocop', require: false
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
gem 'dotenv-rails'

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'database_cleaner'
  gem 'factory_bot_rails'
  gem 'pry'
  gem 'rails-controller-testing'
  gem 'rspec-rails', '~> 3.8'
  gem 'shoulda-matchers'
  gem 'simplecov', require: false
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end
