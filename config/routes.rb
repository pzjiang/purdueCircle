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
      #discover posts 
      get "postsdiscover/:search/:number", to: "posts#discover_posts"
      
      #saving posts implementations
      get "savedposts/:id/:number", to: "posts#get_saves"
      post "savepost", to: "posts#change_save"

      #changing privacy settings for a post
      put "changeprivacy/:id", to: "posts#change_privacy"

      resources :posts, only: [:show, :update,  :create, :destroy]

      #topics routes
      #pull posts according to name, and the number of posts wanted
      get "topicspull/:number/:name", to: "topics#pull_posts"
      #pull the topics that a post possesses
      get "topics/post/:post_id", to: "topics#post_topics"
      #discover topics through searching
      get "topicsdiscover/:name/:number", to: "topics#discover_topics"

      #comment routes for show, delete, and add

      delete "delcomments/:id", to: "comments#remove_comment"
      get "comments/:post_id", to: "comments#show_comments"
      put "comments", to: "comments#add_comment"

      #advanced routes for users, searching users
      #search for users that contain the given name sequence in their names, or their usernames
      get "usersearch/:name/:number", to: "users#discover_users_name"
      #find a specific user by username
      get "userfind/:name", to: "users#find_user"
      #privacy chaing for users
      put "userprivacy/:id", to: "users#change_privacy"

      #following routes
      #creates a follower to symbolize user is now following. uses :id and :target_id
      post "followuser", to: "users#follow_user"
      #check if user is following another
      get "followinguser/:id/:target_id", to: "users#is_following"
      #unfollow a user, with :id and :target_id
      delete "followuser/:id/:target_id", to: "users#unfollow_user"
      #get the followers of a user, :id to find user
      get "userfollowers/:id", to: "users#get_followers"
      #get the people that a user follows, :id to find user
      get "userfollowing/:id", to: "users#get_followed"
      
      #following topic routes
      #follow a topic needs :name and :id
      post "followtopic", to: "topics#follow_topic"
      #unfollow needs :name and :id
      delete "followtopic/:name/:id", to: "topics#unfollow_topic"
      #get hte topics that the user follows
      get "followedtopics/:id", to: "topics#followed_topics"
      
    end
  end

  # put '/confirmation/:confirmation_token', to: 'pages#index', as: :frontend_user_confirmation
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root 'pages#index'

  get '/*path' => 'pages#index'

end
