module GoogleMaps
  class Client
    include HTTParty

    base_uri "https://maps.googleapis.com/maps/api"

    def initiatialize(api_key)
      @api_key = api_key
    end

    def place_id_to_lat_lon(google_place_id)
      params = { query: { placeid: google_place_id, key: @api_key } }
      self.class.get(
        "/place/details/json",
        params
      )

      binding.pry
    end
  end
end