Rails.application.routes.draw do
    namespace :api, defaults: { format: :json } do
        resources :users, only: [:create, :show, :update, :destroy]
        resources :posts, except: [:new, :edit]
        resource :session, only: [:show, :create, :destroy]
        resources :friendships, only: [:create, :index, :destroy]
    end

    get '*path', 
        to: 'static_pages#frontend', 
        constraints: lambda { |req| !req.xhr? && req.format.html? } 

    root to: 'static_pages#frontend'
end
