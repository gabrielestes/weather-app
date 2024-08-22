class WeatherController < ApplicationController
  def weekly_weather
    @google_api_key = ENV["GOOGLE_MAPS_API_KEY"]
    @base_url = request.base_url

    if weather_params[:lat] && weather_params[:lon]
      weather_data = retrieve_weather
      @weather = JSON.parse(weather_data[:data])
      @cached_at_utc = weather_data[:cached_at_utc]
      render json: { weather: @weather, cached_at_utc: @cached_at_utc }
    end
  end

  def retrieve_weather
    cache_key = "weather/#{weather_params[:lat]},#{weather_params[:lon]}"

    Rails.cache.fetch(cache_key) do |_key, options|
      options.expires_in(30.minutes)
      client = WeatherApi::Client.new
      response = client.forecast(weather_params[:lat], weather_params[:lon])
      {
        data: response.body,
        cached_at_utc: Time.now.utc
      }
    end
  end

  private def weather_params
    params.permit(:lat, :lon)
  end
end
