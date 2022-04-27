class Api::V1::ProfilesController < Api::V1::BaseController
    
    before_action :authenticate_user!
    before_action :set_profile
    skip_before_action :authenticate_user_using_x_auth_token
    skip_before_action :verify_authenticity_token, raise: false
    skip_after_action :verify_authorized, raise: false

    


    def show
        if @profile
            render json: {profile: @profile}
          else
            render json: {error: "profile with id #{params[:id]} not found "}, status: :not_found
            #respond_with_error "Profile with id #{params[:user_id]} not found.", :not_found
          end
    end


   

    def update
        if @profile.blank?
            respond_with_error "Profile with id #{params[:id]} not found.", :not_found
      
          elsif @profile.update(profile_params)
            render json: @profile
      
          else
            render json: { error: @profile.errors.full_messages.to_sentence }, status: 422
          end
    end


    def likes_post
      @liked = @profile.likedposts.find_by(id: params[:post_id])
      if @liked
        render json: {status: true}, status:200
      else
        render json: {status: false}, status:200
      end
    end

    def change_privacy
      if @profile
        if @profile.privacy == false
          @profile.privacy = true
        else
          @profile.privacy = false
        end
      else
        respond_with_error "profile not found", :not_found
      end

    end


    private
        def set_profile
            #@profile = current_user.profile
            @profile = Profile.find_by(user_id: params[:id])
            #puts params[:id].to_i
            
        end

        def profile_params
            params.require(:profile).permit(:bio)
        end

end