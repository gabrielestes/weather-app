class WeatherController < ApplicationController

  # Retrieves the weekly weather data based on the latitude and longitude parameters.
  #
  # @return [JSON] The weather data in JSON format.
  # @raise [StandardError] If an error occurs while retrieving the weather data.
  def weekly_weather
    # Retrieve the Google Maps API key from the environment variables.
    @google_api_key = ENV["GOOGLE_MAPS_API_KEY"]

    # Get the base URL of the current request.
    @base_url = request.base_url

    # Return if latitude and longitude parameters are not provided.
    return unless weather_params[:lat] && weather_params[:lon]

    begin
      # Retrieve the weather data.
      weather_data = retrieve_weather

      # Parse the weather data into a JSON object.
      @weather = JSON.parse(weather_data[:data])

      # Get the UTC timestamp when the weather data was last cached.
      @cached_at_utc = weather_data[:cached_at_utc]

      # Render the weather data and the cached timestamp as JSON.
      render json: { weather: @weather, cached_at_utc: @cached_at_utc }
    rescue StandardError => e
      # Render an error message if an exception occurs.
      render json: { error: e.message }, status: :internal_server_error
    end
  end

  # Retrieves the weather forecast for a given latitude and longitude.
  #
  # @return [Hash] The weather forecast data and the timestamp when it was cached.
  def retrieve_weather
    # Generate a cache key based on the latitude and longitude parameters
    cache_key = "weather/#{weather_params[:lat]},#{weather_params[:lon]}"

    # Fetch the weather forecast from the cache or make an API request if not found
    Rails.cache.fetch(cache_key, expires_in: 30.minutes) do
      # Make an API request to retrieve the weather forecast
      WeatherApi::Client.new.forecast(weather_params[:lat], weather_params[:lon]).yield_self do |response|
        # Return the weather forecast data and the current timestamp in UTC
        {
          data: response.body,
          cached_at_utc: Time.now.utc
        }
      end
    end
  end

  private def weather_params
    params.permit(:lat, :lon)
  end
end
