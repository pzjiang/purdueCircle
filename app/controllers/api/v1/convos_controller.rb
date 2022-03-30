class Api::V1::ConvosController < Api::V1::BaseController
    #before_action :authenticate_user!
    skip_before_action :authenticate_user_using_x_auth_token
    skip_before_action :verify_authenticity_token, raise: false
    skip_after_action :verify_authorized, raise: false


    def create_convo

        #check to make sure convo doesn't already exist
        @convo = Convo.where(first_user_id: params[:user_id])
        if @convo
            @found = @convo.find_by(sec_user_id: params[:target_id])
        end

        if @found
            respond_with_error "convo already exists", 404
        end

        @convo = Convo.where(sec_user_id: params[:user_id])
        if @convo
            @found = @convo.find_by(first_user_id: params[:target_id])
        end

        if @found
            respond_with_error "convo already exists", 404
        end

        @convo = Convo.create(first_user_id: params[:user_id], sec_user_id: params[:target_id], message_number: 0)

        if @convo.save!
            render json: @convo, status: 200
        else
            respond_with_error "Couldn't save convo with user", 404
        end
    end

    def get_messages
        @convo = Convo.find(params[:convo_id])

        if @convo
            @messages = Message.where(convo_id: params[:convo_id])
            render json: {messages: @messages}, status: 200

        else
            respond_with_error "this convo does not exist?", 404
        end
    end


    def get_convos
        @first_one = Convo.where(first_user_id: params[:user_id]).all
        @second_one = Convo.where(sec_user_id: params[:user_id]).all
        @final_list = @first_one + @second_one

        @final_list.sort_by!

        render json: {convos: @final_list}, status: 200

    end



    private


end