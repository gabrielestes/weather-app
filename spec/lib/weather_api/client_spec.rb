require 'rails_helper'

RSpec.describe WeatherApi::Client, type: :model do
  describe "#forecast" do
    let(:lat) { "37.7749" }
    let(:lon) { "-122.4194" }
    let(:weather_data) do
      {
        "daily" => {
          "temperature_2m_min" => [10, 12],
          "temperature_2m_max" => [20, 22],
          "time" => ["2024-08-21", "2024-08-22"]
        }
      }.to_json
    end

    before do
      allow(described_class).to receive(:get).and_return(OpenStruct.new(body: weather_data))
    end

    it "sends a GET request to the weather API with the correct parameters" do
      params = {
        query: {
          latitude: lat,
          longitude: lon,
          temperature_unit: "fahrenheit",
          daily: "temperature_2m_max,temperature_2m_min",
          current: ["temperature_2m", "cloud_cover"]
        }
      }
      expect(described_class).to receive(:get).with(
        "/v1/forecast",
        params
      )

      WeatherApi::Client.new.forecast(lat, lon)
    end
  end
end