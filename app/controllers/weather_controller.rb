class WeatherController < ApplicationController
  def index
    @greeting = "Hello, world!"
    @google_api_key = ENV["GOOGLE_MAPS_API_KEY"]
    @base_url = request.base_url

    if weather_params[:lat] && weather_params[:lon]
      client = TomorrowApi::Client.new(ENV["TOMORROW_API_KEY"])
      resp = client.forecast(weather_params[:lat], weather_params[:lon])

      if resp.ok?
        @weather = JSON.parse(resp.body).to_json
        render json: @weather
      end
    end
  end

  private def weather_params
    params.permit(:lat, :lon)
  end
end
