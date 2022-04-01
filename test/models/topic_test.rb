require "test_helper"

class TopicTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  test "valid topic name" do
    topic = Topic.create(name: "purdue2")
    assert topic.save!
  end

  test "invalid topic name" do
    topic = Topic.create(name: "purdue")
    assert_not topic.save
  end
  
end
