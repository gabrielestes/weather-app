Rails.application.routes.draw do
  root to: "weather#index"

  get "/weather" => "weather#index"
end
