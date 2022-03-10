class Api::V1::TopicsController < Api::V1::BaseController
    
    before_action :authenticate_user!
    before_action :set_topic
    skip_before_action :verify_authenticity_token, raise: false
    skip_after_action :verify_authorized, raise: false


    def create
        @topic = Topic.new(name: params[:name])
        if @topic.save
            render json: @topic, status: 200
        else
            respond_with_error "Cannot create topic", status: :unprocessable_entity
        end
    end


    def pull_posts
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
    
    
  
    
  
    private
    
    def set_topic
        @topic = Topic.find_by(name: params[:name])
    end
      
  end