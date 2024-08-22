module WeatherApi
  class Client
    include HTTParty

    base_uri "api.open-meteo.com"

    def initialize
    end

    # Retrieves the weather forecast for a given latitude and longitude.
    #
    # @param lat [Float] The latitude of the location.
    # @param lon [Float] The longitude of the location.
    #
    # @return [Hash] The weather forecast for the specified location, including:
    #   - Maximum and minimum temperature for each day.
    #   - Current temperature.
    #   - Cloud cover.
    def forecast(lat, lon)
      params = { query: { latitude: lat, longitude: lon, temperature_unit: "fahrenheit", daily: "temperature_2m_max,temperature_2m_min", current: ["temperature_2m", "cloud_cover"]} }
      self.class.get(
        "/v1/forecast", params
      )
    end
  end
end