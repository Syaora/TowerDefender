Rails.application.routes.draw do
  resources :users, only: [:show, :create]
  resources :user_games
  resources :games, only: [:index]
  resources :rounds, only: [:show]

  #session
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  #user
  get "/dashboard", to: "user_games#show"
  get "/usergames", to: "user_games#games"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
