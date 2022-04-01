class Api::V1::TopicsController < Api::V1::BaseController
    
    #before_action :authenticate_user!
    #before_action :set_topic, only: [:pull_posts]
    skip_before_action :authenticate_user_using_x_auth_token
    skip_before_action :verify_authenticity_token, raise: false
    skip_after_action :verify_authorized, raise: false


    def index
        @topics = Topic.all
        render json: {topics: @topics}, status: 200
    end

    def discover_topics
        @searchparam = "%" + params[:name] + "%"
        begin
            @topics = Topic.where('name LIKE ?', @searchparam).last(params[:number])
        rescue
            respond_with_error "no topics found but error thrown", :not_found
        else
        end
        if @topics
            render json: {topics: @topics}, status: 200
        else
            respond_with_error "no topics found", :not_found
        end
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

    def followed_topic_posts
        @user = User.find(params[:id])
        @topics = @user.topics.all

        @posts = []
        tempposts = []
        if @topics
            for topic in @topics do
                tempposts = topic.posts.all
                tempposts.each {|element| @posts.append(element)}
            end
        end

        render json: {posts: @posts}, status: 200
    end


    def pull_posts
        @topic = Topic.find_by(name: params[:name])
        #begin
        if params[:number]
            @posts = @topic.posts.last(params[:number])
        else
            @posts = @topic.posts.last(10)
        end
        #rescue
            #respond_with_error "there are not posts", :not_found
            #return
        #else
        #end
        

        render json: {posts: @posts}, status: 200

    end

    def remove_topic
        
    end

    def follow_topic
        @topic = Topic.find_by(name: params[:name])
        begin
            @exist = Usertopic.where(user_id: params[:id]).find_by(topic_id: @topic.id)
        rescue
        else
        end

        if @exist
            respond_with_error "you already follow this topic", :unprocessable_entity
            return
        end

        @relation = Usertopic.create(topic_id: @topic.id, user_id: params[:id])

        if @relation.save!
            render json: @relation, status: 200
        else
            respond_with_error "not able to follow topic ", status: 404
        end

    end


    def unfollow_topic
        @topic = Topic.find(params[:name])
        begin
            @relation = Usertopic.where(user_id: params[:id]).find_by(topic_id: @topic.id)
        rescue
        else
        end

        if @relation
            if @relation.destroy!
                render json: {id: @topic.id}, status: 200
                return
            end
        end
        respond_with_error "unable to unfollow topic", :unprocessable_entity

    end


    def followed_topics
        begin
            @relations = Usertopic.where(user_id: params[:id]).all
        rescue
        else
        end

        @topics = []
        if @relations
            for relation in @relations do
                temptopic = Topic.find(relation.topic_id)
                @topics.push(temptopic)
            end
        end

        if @topics
            render json: {topics: @topics}, status: 200
        else
            respond_with_error "no topics found", :not_found
        end

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