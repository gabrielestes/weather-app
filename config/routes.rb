Rails.application.routes.draw do
  root to: "weather#index"

  get "/weather", to: "weather#weekly_weather"
end
