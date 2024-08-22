module WeatherApi
  class Client
    include HTTParty

    base_uri "api.open-meteo.com"

    def initialize
    end

    def forecast(lat, lon)
      params = { query: { latitude: lat, longitude: lon, temperature_unit: "fahrenheit", daily: "temperature_2m_max,temperature_2m_min", current: ["temperature_2m", "cloud_cover"]} }
      self.class.get(
        "/v1/forecast", params
      )
    end
  end
end