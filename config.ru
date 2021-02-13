require "dotenv/load"
require "bridgetown-plugin-nano/rack_middleware"
require_relative "./backend/config/application"

if Dir.exist?("output")
  # Only use static middleware if the output folder exists:
  use BridgetownPluginNano::Middleware::Static, root: "output", urls: %w[/]
  use BridgetownPluginNano::Middleware::NotFound, "output/404.html"
end

run NanoAPI
