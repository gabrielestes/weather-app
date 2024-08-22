require 'rails_helper'

RSpec.describe WeatherController, type: :controller do
  let(:lat) { "37.7749" }
  let(:lon) { "-122.4194" }
  let(:cache_key) { "weather/#{lat},#{lon}" }
  let!(:weather_data) do
    {
      "daily" => {
        "temperature_2m_min" => [10, 12],
        "temperature_2m_max" => [20, 22],
        "time" => ["2024-08-21", "2024-08-22"]
      }
    }.to_json
  end
  let(:weather_client) { instance_double(WeatherApi::Client) }
  let(:request_params) { { lat: lat, lon: lon } }

  before do
    allow(WeatherApi::Client).to receive(:new).and_return(weather_client)
    allow(weather_client).to receive(:forecast).with(lat, lon).and_return(OpenStruct.new(body: weather_data))
  end

  describe "GET #weekly_weather" do
    context "when lat and lon are provided" do
      it "returns the weather data as JSON" do
        get :weekly_weather, params: request_params

        expect(response).to have_http_status(:ok)
        response_body = JSON.parse(response.body)
        expect(response_body["weather"]).to eq(JSON.parse(weather_data))
        expect(response_body["cached_at_utc"]).to be_a(String)
      end

      it "caches the parsed weather data" do
        expect(Rails.cache).to receive(:fetch).with(cache_key, { expires_in: 30.minutes }).and_call_original

        get :weekly_weather, params: request_params

        cached_data = Rails.cache.read(cache_key)
        expect(cached_data[:cached_at_utc]).to be_a(Time)
        expect(cached_data[:data]).to eq(JSON.parse(weather_data))
      end

      it "uses cached data on subsequent requests" do
        Rails.cache.write(
          cache_key,
          { data: JSON.parse(weather_data), cached_at_utc: Time.now.utc }
        )

        expect(weather_client).not_to receive(:forecast)

        get :weekly_weather, params: request_params

        expect(response).to have_http_status(:ok)
        response_body = JSON.parse(response.body)
        expect(response_body["weather"]).to eq(JSON.parse(weather_data))
        expect(response_body["cached_at_utc"]).to be_a(String)
      end
    end

    context "when lat and lon are missing" do
      it "does not attempt to fetch weather data and returns no content" do
        get :weekly_weather, params: {}

        expect(response).to have_http_status(:no_content)
        expect(JSON.parse(response.body)).to be_empty
      end
    end
  end
end