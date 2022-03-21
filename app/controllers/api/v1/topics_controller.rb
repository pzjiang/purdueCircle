class Api::V1::TopicsController < Api::V1::BaseController
    
    before_action :authenticate_user!
    #before_action :set_topic, only: [:pull_posts]
    skip_before_action :authenticate_user_using_x_auth_token
    skip_before_action :verify_authenticity_token, raise: false
    skip_after_action :verify_authorized, raise: false


    def index
        @topics = Topic.all
        render json: {topics: @topics}, status: 200
    end


    def create
        @topic = Topic.new(name: params[:name])
        if @topic.save
            render json: @topic, status: 200
        else
            respond_with_error "Cannot create topic", status: :unprocessable_entity
        end
    end

    def post_topics
        @post = Post.find(params[:post_id])
        if @post
            @topics = @post.topics.all
            @returned = []
            @topics.each {|element| @returned.append(element.name) }

            render json: {topics: @returned}, status: 200
        else
            respond_with_error "post does not exist", :not_found
        end
    end


    def pull_posts
        @topic = Topic.find_by(name: params[:name])
        begin
            if params[:number]
                @posts = @topic.posts.last(params[:number])
            else
                @posts = @topic.posts.last(10)
            end
        rescue
            respond_with_error "there are not posts", :not_found
        else
        end

        render json: {posts: @posts}, status: 200

    end

    def remove_topic
        
    end


    def delete_all_topics
        #created solely for database clearing purposes / testing
        @topics = Topic.all

        @topics.each do |topic|
            topic.destroy
        end
    end
    
    
  
    
  
    private
    
   
  end