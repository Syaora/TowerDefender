Rails.application.routes.draw do
  
  # Routing logic: fallback requests for React Router.
  resources :users, only: [:index, :show, :create] do
    resources :usergames 
  end

  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
