class Api::V1::MessagesController < Api::V1::BaseController

    #before_action :authenticate_user!
    skip_before_action :authenticate_user_using_x_auth_token
    skip_before_action :verify_authenticity_token, raise: false
    skip_after_action :verify_authorized, raise: false

    ##
    def get_messages
        #@target = Message.where(target_id: params[:target_id]).all
        #@targets = []
        #if @target
            #for tar in @target do
                #if tar.origin_id == params[:origin_id]
                    #@targets.push(tar)
                #end
            #end
        #end
        #@origins = Message.where(target_id: params[:origin_id]).all
        #@origin = []
        #if @origins
            #for tar in @target do
                #if tar.origin_id == params[:target_id]
                    #@targets.push(tar)
                #end
            #end
        #end
        #@listing = @targets + @origin
    
        #@listing.sort_by! 
    
        #render json: {response: @listing}, status: 200
        @convo = Convo.find(params[:convo_id])
        @listing = @convo.messages.all
        
        if @listing
            render json: {messages: @listing, id1: @convo.first_user_id, id2: @convo.sec_user_id}, status: 200
        else
            respond_with_error "no messages found", :not_found
        end
    
    end
    
    def delete_message

    end

    def send_message

        #check if blocked or blocking
        this_user = User.find(params[:origin_id])
        blocked = this_user.fans.find_by(subject: params[:target_id])

        if blocked
            if blocked.blocked == true
                respond_with_error "you are blocked", :unprocessable_entity
            end
        end

        blocked = this_user.followings.find_by(target: params[:target_id])

        if blocked
            if blocked.blocked == true
                respond_with_error "you block them", :unprocessable_entity
            end
        end

        #check if target is private, can't message if they aren't following you 
        target_user = User.find(params[:target_id])
        if target_user.privacy == true
            blocked = target_user.following.find_by (target: params[:origin_id])
            if blocked
            else
                respond_with_error "user is private", :unprocessable_entity
            end
        end
        
        #logic for actually sending the message
        @newMessage = Message.create(origin_id: params[:origin_id], target_id: params[:target_id], body: params[:body], convo_id: params[:convo_id])
        @convo = Convo.find(params[:convo_id])
        if @convo
            @convo.increment!(:message_number)
        else
            respond_with_error "convo not found", :not_found
            return
        end

    
        if @newMessage.save!
            @convo.save!
            generate_notification(params[:target_id], "you have a new message from " + target_user.first_name , 2, @convo.id)
            render json: {newMessage: @newMessage}, status: 200
        else
            respond_with_error "message could not be sent", :unprocessable_entity
        end
    end


    private


end