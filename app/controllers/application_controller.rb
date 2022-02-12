class ApplicationController < ActionController::Base
    #before_action :configure_permitted_parameters, if: :devise_controller?
    skip_before_action :verify_authenticity_token
    #before_action :authenticate_user!
    rescue_from Exception, with: :handle_api_exceptions
    protect_from_forgery with: :null_session
    

    respond_to :json
    #private
    
    before_action :cor
    def cor
      headers["Access-Control-Allow-Origin"]  = "*"
      headers["Access-Control-Allow-Methods"] = %w{GET POST PUT DELETE}.join(",")
      headers["Access-Control-Allow-Headers"] = %w{Origin Accept Content-Type X-Requested-With X-CSRF-Token}.join(",")
      head(:ok) if request.request_method == "OPTIONS"
    end

 
 



    #protected
  
    #def configure_permitted_parameters
      #added_attrs = [:username, :email, :password, :password_confirmation, :remember_me]
      #devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
      #devise_parameter_sanitizer.permit :sign_in, keys: [:login, :password]
      #devise_parameter_sanitizer.permit :account_update, keys: added_attrs
    #end
  end