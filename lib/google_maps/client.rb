module GoogleMaps
  class Client
    include HTTParty

    base_uri "https://maps.googleapis.com/maps/api"

    def initiatialize(api_key)
      @api_key = api_key
    end

  end
end