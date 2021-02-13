require "action_controller/railtie"

class NanoAPI < Rails::Application
  config.root = File.dirname(__dir__) # set the root to `backend`
  config.autoloader = :zeitwerk
  if Rails.env.production?
    config.eager_load = true
    config.cache_classes = true
  else
    config.eager_load = false
  end
  config.autoload_paths << File.dirname(__dir__) # autoload right from `backend`
  config.api_only = true # removes middleware we don't need
  config.logger = ActiveSupport::Logger.new($stdout)
  Rails.logger  = config.logger
  config.filter_parameters += [:password]
  config.secret_key_base = ENV["SECRET_KEY_BASE"] # Rails won't boot w/o a secret token for session, cookies, etc.
end

require_relative "base_classes"

NanoAPI.initialize!
