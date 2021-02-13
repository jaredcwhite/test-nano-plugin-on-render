class NanoController < ApplicationController
  def index
    render json: {
      status: "index route",
      hello: "Howdy! I'm Nano, your friendly neighborhood Ruby on Rails backend. :)",
      current_time: Time.now
    }
  end

  def show
    render json: {
      status: "show route",
      id: params[:id]
    }
  end
end
