class WeatherController < ApplicationController
  def index
    @greeting = "Hello, world!"
    client = TomorrowApi::Client.new(ENV["TOMORROW_API_KEY"])
    resp = client.forecast(42.3478,-71.0466)

    if resp.ok?
      @weather = JSON.parse(resp.body).to_json
    end
  end
end
