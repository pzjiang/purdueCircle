class Api::V1::UsersController < Api::V1::BaseController
  skip_before_action :authenticate_user!, only: [:create]
  skip_before_action :authenticate_user_using_x_auth_token
  before_action :set_user, only: [:show, :edit, :update, :destroy, :change_privacy]
  #before_action :authenticate_user!, only: [:update]
  skip_before_action :verify_authenticity_token, raise: false
  skip_after_action :verify_authorized, raise: false

  def show
    if @user
      render json: @user
    else
      respond_with_error "User with id #{params[:id]} not found.", :not_found
    end
  end


  def discover_users_name
    @searchparam = '%' + params[:name] + '%'
    begin
      @users = User.where('first_name LIKE ?', @searchparam).last(params[:number])
    rescue
    else
    end
    begin
      @moreusers = User.where('last_name LIKE ?', @searchparam).last(params[:number])
    rescue
    else
    end
    @returned  = @users + @moreusers
    render json: {users: @returned}, status: 200
  end



  def find_user
    @user = User.find_by(username: params[:name])
    if @user
      @profile = Profile.find_by(user_id: @user.id)
      render json: {user: @user, profile: @profile}, status: 200
    else
      respond_with_error "user does not exist", :not_found
    end
  end

  def create
    user = User.create user_params
    if user.valid?
      sign_in(user)
      #create profile that is associated with user upon user creation
      @profile = user.create_profile(bio: "", user_id: user.id, privacy: false)
      render json: { user: user, auth_token: user.authentication_token }
    else
      render json: { error: user.errors.full_messages.to_sentence }, status: 422
    end
  end



  def update
    if @user.blank?
      respond_with_error "User with id #{params[:id]} not found.", :not_found

    elsif @user.update(user_params)
      render json: {user: @user}, status: 200

    else
      render json: { error: @user.errors.full_messages.to_sentence }, status: 422
    end
  end

  def destroy
    if @user.blank?
      respond_with_error "User with id #{params[:id]} not found.", :not_found

    elsif @user.destroy
      #render json: @user
      reset_session

    else
      render json: { error: @user.errors.full_messages.to_sentence }, status: 422
    end
  end

  #used to make a user follow another user
  def follow_user
    begin
      @followed = Follower.where('subject LIKE ?', params[:id]).find_by(target: params[:target_id])
    rescue
    else
    end

    if @followed
      respond_with_error "already following this user", status: 404
      return
    end
    @follower = Follower.create(subject: params[:id], target: params[:target_id])
    if @follower.save!
      render json: {follower: @follower}, status: 200
    else
      respond_with_error "could not follow user", status: 404
    end
    #render json: {}, status: 200
  end

  #used to check if the user is following another user
  def is_following
    begin
      @follower = Follower.where(subject: params[:id]).find_by(target: params[:target_id])
    rescue
    else
    end

    if @follower
      render json: {status: true}, status: 200
    else
      render json: {status: false}, status: 200
    end
  end

  #used to unfollow a user
  def unfollow_user
    begin
      @follower = Follower.where(subject: params[:id]).find_by(target: params[:target_id])
    rescue
    else
    end
  

    if @follower.destroy!
      render json: {}, status: 200
    else
      respond_with_error "could not unfollow the user", status: 404
    end

  end

  #get a list of all followers that are following you
  def get_followers
    begin
      @followings = Follower.where(target: params[:id]).all
    rescue
    else
    end
    @followers = []
    for follow in @followings do
      tempuser = User.find(follow.subject)
      @followers.push(tempuser)
    end
    if @followers
      render json: { followers: @followers}, status: 200
    else
      respond_with_error "no followers", :not_found
    end


  end

  #get a list of all the people that you follow
  def get_followed
    begin
      @followings = Follower.where(subject: params[:id]).all
    rescue
    else
    end
    @followers = []
    for follow in @followings do
      tempuser = User.find(follow.target)
      @followers.push(tempuser)
    end
    if @followers
      render json: { following: @followers}, status: 200
    else
      respond_with_error "no following found", :not_found
    end
  end

  def change_privacy
    #use put
    if @user.privacy
      @user.privacy = false
    else
      @user.privacy=true
    end
    if @user.save!
      render json: {user: @user}, status: 200
    else
      respond_with_error "couldn't change the privacy of the user", status: 404
    end
  end


  private

  def send_devise_notification(notification, *args)
    devise_mailer.send(notification, self, *args).deliver_now()
    @user.confirmed_at=Time.current
  end

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :username, :password, :password_confirmation)
  end
end