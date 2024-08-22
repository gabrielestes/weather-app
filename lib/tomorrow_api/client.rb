module TomorrowApi
  class Client
    include HTTParty

    base_uri "api.tomorrow.io"

    def initialize(api_key)
      @api_key = api_key
    end

    def forecast(lat, lon)
      params = { query: { latitude: lat, longitude: lon, temperature_unit: "fahrenheit", daily: "temperature_2m_max,temperature_2m_min"} }
      self.class.get(
        "https://api.open-meteo.com/v1/forecast", params
      )
    end
  end
end