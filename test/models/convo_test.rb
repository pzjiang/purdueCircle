require "test_helper"

class ConvoTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  test "invalid save" do
    #needs id params
    convo = Convo.create()
    assert_not convo.save
  end

  test "valid save" do
    #has id params
    users = User.last(2)
    convo = Convo.create(first_user_id: users[0].id, sec_user_id: users[1].id, message_number: 0)
    assert convo.save
    convo.destroy
  end
end
