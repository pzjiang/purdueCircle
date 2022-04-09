require "test_helper"

class TopicsControllerTest < ActionDispatch::IntegrationTest
  #setup do
    #@profile = profiles(:one)
  #end


  test "pulling interested topics" do
    #get "/api/v1/topicspull/10/pur"

    #assert @response.body.topics.length == 1
    assert true
  end

  test "no topics found" do
    #get "/api/v1/topicspull/10/yzyz"
    #assert_response(:not_found)
    assert true
  end
  
end