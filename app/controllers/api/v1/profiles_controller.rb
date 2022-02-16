class Api::V1::ProfilesController < Api::V1::BaseController
    
    before_action :authenticate_user
    before_action :set_profile
    skip_before_action :verify_authenticity_token, raise: false
    skip_after_action :verify_authorized, raise: false


    def create


    end





    private
        def set_profile
            @profile = current_user.profile
            
        end

end