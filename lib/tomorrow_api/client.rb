module TomorrowApi
  class Client
    include HTTParty

    base_uri "api.tomorrow.io"

    def initialize(api_key)
      @api_key = api_key
    end

    def forecast(lat, lon)
      # options = { query: { apikey: @api_key, location: "#{lat},#{lon}" } }

      # self.class.get(
      #   "/v4/weather/forecast", options
      # )

      params = { query: { latitude: 52.52, longitude: 13.41, daily: "temperature_2m_max"} }
      self.class.get(
        "https://api.open-meteo.com/v1/forecast", params
      )
    end
  end
end