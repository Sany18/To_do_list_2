require 'spec_helper'
require 'devise'
require 'simplecov'
require 'factory_bot'
require 'bot_helper'
require 'controllers/user/lui'
require 'database_cleaner'


ENV['RAILS_ENV'] ||= 'test'

SimpleCov.start "rails" do
  add_filter "app/channels/application_cable/channel.rb"
  add_filter "app/channels/application_cable/connection.rb"
  add_filter "app/controllers/user/omniauth_callbacks_controller.rb"
  add_filter "app/jobs/application_job.rb"
  add_filter "app/mailers/application_mailer.rb"
  add_filter "app/controllers/user/registrations_controller.rb"
end

require File.expand_path('../../config/environment', __FILE__)

abort("The Rails environment is running in production mode!") if Rails.env.production?
require 'rspec/rails'
RspecImage.new

begin
  ActiveRecord::Migration.maintain_test_schema!
rescue ActiveRecord::PendingMigrationError => e
  puts e.to_s.strip
  exit 1
end

RSpec.configure do |config|
  config.fixture_path = "#{::Rails.root}/spec/fixtures"
  config.use_transactional_fixtures = true
  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!

  config.include FactoryBot::Syntax::Methods
  config.include Devise::Test::ControllerHelpers, :type => :controller
  config.include Devise::Test::IntegrationHelpers, type: :feature

  config.before(:suite) do
    DatabaseCleaner.clean_with(:truncation)
    DatabaseCleaner.strategy = :transaction
  end

  config.around(:each) do |example|
    DatabaseCleaner.cleaning do
      example.run
    end
  end
end