Rails.application.routes.draw do
  
  resources :posts
  resources :profiles
  #scope :api, defaults: { format: :json } do
    #devise_for :users,controllers: { sessions: :sessions }, path_names: { sign_in: :login }
    #resource :user, only: [:show, :update]
  #end
  devise_for :users, path_prefix: "devise", controllers: {registrations: "registrations"}

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      devise_scope :user do
        post "login" => "sessions#create", as: "login"
        delete "logout" => "sessions#destroy", as: "logout"
        put "password/update", to: "registrations#update_password"
      end

      resources :users, only: [:show, :create, :update, :destroy]

      resources :profiles, only: [:show, :update]
      
    end
  end


  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'pages#index'

  get '/*path' => 'pages#index'

end
