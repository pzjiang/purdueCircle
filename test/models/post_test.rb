require "test_helper"

class PostTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end


  test "last updated" do 
    user = User.last
    profile = user.profile
    post = post.create(profile_id: profile.id, user_id: user.id, title: "testing", body: "testing", privacy: false)
    post.save
    time = post.updated_at
    post.privacy = true
    post.save
    time2 = post.updated_at
    post.destroy
    assert time2 != time
  end
end
