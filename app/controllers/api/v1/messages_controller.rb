class Api::V1::MessagesController < Api::V1::BaseController

    before_action :authenticate_user!
    skip_before_action :authenticate_user_using_x_auth_token
    skip_before_action :verify_authenticity_token, raise: false
    skip_after_action :verify_authorized, raise: false


    def get_messages
        @targets = Messages.where(target_id: params[:target_id])
        if @targets
            @targets = @targets.where(origin_id: params[:origin_id])
        end
        @origins = Messages.where(target_id: params[:origin_id])
        if @origins
            @origins = @origins.where(origin_id: params[:target_id])
        end
        @listing = @targets + @origins

        @listing.sort_by! created_at

        render json: {allmessages: @listing}, status: 200

    end


    def send_message
        
        @newMessage = Messages.new(origin_id: params[:origin_id], target_id: params[:target_id], body: params[:body])
        if @newMessage.save
            render json: {@newMessage}, status: 200
        else
            respond_with_error "message could not be sent", :unprocessable_entity
        end
    end


    private


end