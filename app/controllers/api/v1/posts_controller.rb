class Api::V1::PostsController < Api::V1::BaseController

    #before_action :authenticate_user!
    before_action :set_post, only: [:update, :show, :destroy, :increment_like, :change_save, :change_privacy, :get_topics] 
    skip_before_action :authenticate_user_using_x_auth_token
    skip_before_action :verify_authenticity_token, raise: false
    skip_after_action :verify_authorized, raise: false

    def topic_name (name)
        @topic = Topic.find_by(name: name)
        if @topic
        else
            @topic = Topic.create(name: name)
        end

    end

    def discover_posts
        @searchparam = "%" + params[:search] + "%"
        begin
            @posts = Post.where('title LIKE ?', @searchparam).last(params[:number])
        rescue
            respond_with_error "no post found with error", :not_found
        else
        end

        if @posts
            render json: {posts: @posts}, status: 200
        else
            respond_with_error "no post found", :not_found
        end

    end

    def index
        begin
            if params[:number]
                @posts = Post.last(params[:number])
            else
                @posts = Post.last(10)
            end
        rescue
            #respond_with_error "there are not posts", :not_found
        else
        end
        

        if @posts
            render json: {posts: @posts} 
        else
            respond_with_error "there are no posts", :not_found
        end
           
    end    

    def add_topic (name, postid)
        relation = Posttopic.new()
        topic_name name
        relation = Posttopic.new(post_id: postid, topic_id: @topic.id)
        relation.save!

    end


    def get_topics
        @topics = @post.topics
        if @topics
            render json: {topics: @topics}, status: 200
        else
            respond_with_error "there are no topics", :not_found
        end
    end

    def retrieve_own
        begin
            @posts = Post.where(user_id: params[:user_id]).last(params[:number])
        rescue
            #respond_with_error "you have no posts of your own", :not_found
        else
        end

        if @posts
            render json: {posts: @posts}
        else
            respond_with_error "you have no posts of your own", :not_found
        end
    end


    def create
        @newpost = Post.new post_params
        @user = current_user
        @profile = @user.profile
        @newpost.profile_id = @profile.id
        @newpost.privacy = false

        if @newpost.valid?
            @newpost.save
            if params[:topics]
                params[:topics].each do |topicname|
                    add_topic topicname, @newpost.id
                end
            end
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
            @author = User.find(@post.user_id)
            @returned = @author.username
            render json: {post: @post, author: @returned}, status: 200
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
        
       
        @profile = Profile.find_by(user_id: params[:profile_id])
        @profile_found = @post.favorites.find_by(profile_id: @profile.id)

        if @profile_found
            @profile_found.destroy
            @post.decrement!(:likes)
            @post.save!
            render json: {status: false, likes: @post.likes}, status: 200
        else
            @new_relation = Favorite.new 
            @new_relation.profile_id = @profile.id
            @new_relation.post_id = params[:id]
            if @new_relation.save!
                @post.increment!(:likes)
                @post.save!
                render json: {status: true, likes: @post.likes}, status: 200
            else
                respond_with_error "failed to save", status:422
            end
            
        end
        #@post.likes = @post.likes + 1
        
    end

    def change_save
        @user = User.find(params[:user_id])
        @profile = @user.profile
        @profile_found = @post.bookmarks.find_by(profile_id: @profile.id)

        if @profile_found
            @profile_found.destroy 
            render json: {destroyed: true}, status: 200
        else
            @post.bookmarks.create(profile_id: @profile.id, post_id: @post.id)
            render json: {destroyed: false}, status: 200

        end
        
    end


    def get_saves

        @user = User.find(params[:id])
        @profile = @user.profile
        begin
            @saved = @profile.saved_posts.last(params[:number])
        rescue
        else
        end

        if @saved
            render json: {saves: @saved}, status: 200
        else
            respond_with_error "no saved posts found", :not_found
        end

    end

    #get liked posts
    def get_liked


    end


    def change_privacy
        if @post.privacy
            @post.privacy = false
        else
            @post.privacy = true
        end
        
        if @post.save!
            render json: {privacy: @post.privacy}, status: 200
        else
            respond_with_error "couldn't change privacy setting", status: 404
        end
    end



    private

    def set_post
        @post = Post.find(params[:id])
    end

    def post_params
        params.require(:post).permit(:title, :body, :profile_id, :user_id)
    end

end