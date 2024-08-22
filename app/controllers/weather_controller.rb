class WeatherController < ApplicationController
  def index
    @greeting = "Hello, world!"
    @google_api_key = ENV["GOOGLE_MAPS_API_KEY"]
    @base_url = request.base_url

    if weather_params[:lat] && weather_params[:lon]
      @weather = JSON.parse(retrieve_weather)
      # @weather = JSON.parse(response.body).to_json
      render json: @weather
    end
  end

  def retrieve_weather
    cache_key = "weather/#{weather_params[:lat]},#{weather_params[:lon]}"

    Rails.cache.fetch(cache_key) do |_key, options|
      client = TomorrowApi::Client.new(ENV["TOMORROW_API_KEY"])
      response = client.forecast(weather_params[:lat], weather_params[:lon])
      response.body
    end
  end

  private def weather_params
    params.permit(:lat, :lon)
  end
end
