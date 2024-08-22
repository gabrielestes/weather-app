Rails.application.routes.draw do
  root to: "weather#weekly_weather"

  get "/weather", to: "weather#weekly_weather"
end
