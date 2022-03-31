class Api::V1::CommentsController < Api::V1::BaseController
    #before_action :authenticate_user!
    skip_before_action :authenticate_user_using_x_auth_token
    skip_before_action :verify_authenticity_token, raise: false
    skip_after_action :verify_authorized, raise: false


    def add_comment
        @user = User.find(params[:user_id])

        @comment = Comment.new(user_id: params[:user_id], post_id: params[:post_id], body: params[:body], author: @user.username)
        if @comment.save!
            render json: {comment: @comment}, status: 200
        else
            respond_with_error "comment could not be added", status: 404
        end
    end


    def remove_comment
        @comment = Comment.find(params[:id])
        if @comment.destroy!
            render json: {}, status: 200
        else
            respond_with_error "comment couldn't be destroyed", status: 404
        end

    end

    def show_comments
        @post = Post.find(params[:post_id])
        @comments = @post.comments.all
        if @comments
            render json: {comments: @comments}, status: 200
        else
            respond_with_error "no comments found", :not_found
        end
    end

end