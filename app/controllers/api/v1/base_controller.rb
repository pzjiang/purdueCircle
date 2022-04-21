class Api::V1::BaseController < ApplicationController
    before_action :authenticate_user_using_x_auth_token
    before_action :authenticate_user!
    
  
    respond_to :json
  
    rescue_from Exception, with: :handle_api_exceptions
    skip_before_action :verify_authenticity_token, raise: false
    skip_after_action :verify_authorized, raise: false
    protect_from_forgery with: :null_session


    def generate_notification (user_id, body, origin, source)
      notification = Notification.create(user_id: user_id, body: body, origin: origin, read: false, source: source)
      user = User.find(params[:user_id])
      user.increment!(:notification_count)
      if notification.save!
          render json: {@notification}, status: 200
      else
          respond_with_error "notification failed", :unprocessable_entity
      end
    end


    private
  
      def handle_api_exceptions(exception)
        log_exception exception
  
        error_message = "Something went wrong. Please try again later."
        respond_with_error(error_message, 500)
      end
  
      def respond_with_error(message, status = 500)
        render json: { error: message }, status: status
      end
  
      def log_exception(exception)
        Rails.logger.info exception.class.to_s
        Rails.logger.info exception.to_s
        Rails.logger.info exception.backtrace.join("\n")
      end
  
      def authenticate_user_using_x_auth_token
        user_email = request.headers["X-Auth-Email"]
        auth_token = request.headers["X-Auth-Token"].presence
        user = user_email && User.find_by_email(user_email)
  
        if user && Devise.secure_compare(user.authentication_token, auth_token)
          sign_in user, store: false
        else
          respond_with_error("Could not authenticate with the provided credentials", 401)
        end
      end
  end