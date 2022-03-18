Rails.application.routes.draw do
  
  #resources :posts
  #resources :profiles
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
        put "account/update", to: "registrations#update_account"
      end

      resources :users, only: [:show, :create, :update, :destroy]

      resources :profiles, only: [:show]

      #edit profile
      put "editprofile", to: "profiles#update"

      #get only your own posts
      get "ownposts/:user_id/:number", to: "posts#retrieve_own"
      
      #dealing with liking posts
      put "likes", to: "posts#increment_like"
      get "likespost/:id/:post_id", to: "profiles#likes_post"
      get "posts/:number/index", to: "posts#index"
      
      #saving posts implementations
      get "savedposts/:id/:number", to: "posts#get_saves"
      post "savepost", to: "posts#change_save"

      #changing privacy settings
      put "changeprivacy/:id", to: "profile#change_privacy"

      resources :posts, only: [:show, :update,  :create, :destroy]

      #topics routes

      
      
    end
  end


  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'pages#index'

  get '/*path' => 'pages#index'

end
