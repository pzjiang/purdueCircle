class Api::V1::PostsController < Api::V1::BaseController

    before_action :authenticate_user!
    before_action :set_post, only: [:update, :show, :destroy, :increment_like] 
    skip_before_action :authenticate_user_using_x_auth_token
    skip_before_action :verify_authenticity_token, raise: false
    skip_after_action :verify_authorized, raise: false

    def index
        @posts = Post.last(10);
        if @posts
            render json: {posts: @posts}
        else
            respond_with_error "there are no posts", :not_found
        end
           
    end    


    def create
        @newpost = Post.new post_params
        @user = current_user
        @profile = @user.profile
        @newpost.profile_id = @profile.id

        if @newpost.valid?
            @newpost.save
            render json: {post: @newpost}, status: 200
        else
            render json: {error: @newpost.errors.full_messages.to_sentence}, status: 422
        end
        
    end


    def update
        if @post.blank?
            respond_with_error "Profile with id #{params[:id]} not found.", :not_found
      
          elsif @post.update(post_params)
            render json: @post
      
          else
            render json: { error: @post.errors.full_messages.to_sentence }, status: 422
          end
    end

    def show
        if @post
            render json: {post: @post}, status: 200
        else
            respond_with_error "no posts found", :not_found
        end

    end


    def destroy
        
        if @post
            @post.destroy
        else
            respond_with_error "post does not exist", :not_found
        end

    end

    def increment_like
        
        @user = current_user
        @profile = @user.profile
        @profile_found = @post.favorites.find_by(profile_id: @profile.id)

        if @profile_found
            @profile_found.destroy
            @post.likes = @post.likes - 1
        else
            @new_relation = Favorite.create 
            @new_relation.profile_id = @profile.id
            @new_relation.post_id = params[:id]
            @post.likes = @post.likes + 1
        end
        #@post.likes = @post.likes + 1
        
    end

    def change_save
        @user = current_user
        @profile = @user.profile
        @profile_found = @post.bookmarks.find_by(profile_id: @profile.id)


    end


    def get_saves

        @user = current_user
        @profile = @user.profile
        @saved = @post.saved_posts.last(params[:number])


    end



    private

    def set_post
        @post = Post.find(params[:id])
    end

    def post_params
        params.require(:post).permit(:title, :body, :profile_id)
    end




end