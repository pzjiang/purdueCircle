class Api::V1::NotificationsController < Api::V1::BaseController

    skip_before_action :authenticate_user_using_x_auth_token
    skip_before_action :verify_authenticity_token, raise: false
    skip_after_action :verify_authorized, raise: false

    #generate notification will be placed inside the base controller
    #origin defines the type of content the notification came from (post, message, follow)
    #source defines the id of the origin (post id, user id)
    #def generate_notification
        #@notification = Notification.create(user_id: params[:user_id], body: params[:body], origin: params[:origin], read: false, source: params[:source] )
        #@user = User.find(params[:user_id])
        #@user.increment!(:notification_count)
        #if @notification.save!
            #render json: {@notification}, status: 200
        #else
            #respond_with_error "notification failed", :unprocessable_entity
        #end
    #end

    #takes a number of notifications
    #takes number, id params
    def get_notifications
        @user = User.find(params[:id])
        if @user
            @notifications = @user.notifications.last(params[:number])
            render json: {notifications: @notifications}, status: 200
        else
            respond_with_error "no user found", :unprocessable_entity
        end
    end

    #called to mark notification as read
    def read_notification
        @user = User.find(params[:user_id])
        @user.decrement!(:notification_count)
        @notification = Notification.find(params[:notification_id])
        @notification.read = true
        if @notification.save!
            render json: {}, status: 200
        else
            respond_with_error "couldn't read notifiation", status: 200
        end

    end

end