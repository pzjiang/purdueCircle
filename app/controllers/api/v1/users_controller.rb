class Api::V1::UsersController < Api::V1::BaseController
  skip_before_action :authenticate_user!, only: [:create]
  skip_before_action :authenticate_user_using_x_auth_token, only: [:create]
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, only: [:update]
  skip_before_action :verify_authenticity_token, raise: false
  skip_after_action :verify_authorized, raise: false

  def show
    if @user
      render json: @user
    else
      respond_with_error "User with id #{params[:id]} not found.", :not_found
    end
  end

  def create
    user = User.create user_params

    if user.valid?
      sign_in(user)
      #create profile that is associated with user upon user creation
      @profile = user.create_profile(bio: "", user_id: user.id)
      render json: { user: user, auth_token: user.authentication_token }
    else
      render json: { error: user.errors.full_messages.to_sentence }, status: 422
    end
  end


  def update
    if @user.blank?
      respond_with_error "User with id #{params[:id]} not found.", :not_found

    elsif @user.update(user_params)
      render json: @user

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

  private

    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:email, :first_name, :last_name, :username, :password, :password_confirmation)
    end
end