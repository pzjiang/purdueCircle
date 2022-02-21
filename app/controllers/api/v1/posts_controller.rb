class Api::V1::PostsController < Api::V1::BaseController

    before_action :authenticate_user!
    before_action :set_post, only: [:update] 
    skip_before_action :authenticate_user_using_x_auth_token
    skip_before_action :verify_authenticity_token, raise: false
    skip_after_action :verify_authorized, raise: false

    def index
    
    end

    def create


    end


    def update
        if @post.blank?
            respond_with_error "Profile with id #{params[:id]} not found.", :not_found
      
          elsif @post.update(post_params)
            render json: @profile
      
          else
            render json: { error: @profile.errors.full_messages.to_sentence }, status: 422
          end
    end



    private

    def set_post
        @post = Post.find(params[:id])
    end

    def post_params
        params.require(:post).permit(:title, :body)
    end




end