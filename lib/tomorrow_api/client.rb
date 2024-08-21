module TomorrowApi
  class Client
    include HTTParty

    base_uri "api.tomorrow.io"

    def initialize(api_key)
      @api_key = api_key
    end

    def forecast(lat, lon)
      options = { query: { apikey: @api_key, location: "#{lat},#{lon}" } }

      self.class.get(
        "/v4/weather/forecast", options
      )
    end
  end
end