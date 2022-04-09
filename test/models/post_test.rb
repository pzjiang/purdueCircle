require "test_helper"

class PostTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end


  test "last updated" do 
    post = Post.create(user_id: 1, profile_id: 1, title: "title", body: "body", privacy: false)
    post.save!
    updatetime = post.updated_at
    post.privacy = true
    post.save!
    update2 = post.updated_at
    assert_not update2 == updatetime
  end

  test "user's posts" do
    user = users(:one)
    posts = user.posts
    assert_not posts.length == 0
  end

  test "post title length validation" do
    post = Post.create(user_id: 1, profile_id: 1, title: "01234560123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789789", body: "body", privacy: false)
  
    assert_not post.save
  end

end
