require "test_helper"

class CommentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  test "length invalid" do 
    user = User.last
    post = Post.last
    comment = Comment.create(user_id:user.id, post_id: post.id, body: "0123456789012345678901234567890123456789012345678901234567890123456789", author: user.username)
    assert_not comment.save
  end

  test "length valid" do 
    user = User.last
    post = Post.last
    comment = Comment.create(user_id:user.id, post_id: post.id, body: "valid", author: user.username)
  
    assert comment.save
    comment.destroy
  end
end
