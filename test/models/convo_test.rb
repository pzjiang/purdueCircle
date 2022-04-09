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
    convo = Convo.create(first_user_id: 1, sec_user_id: 2, message_number: 0)
    assert convo.save
  end

  test "get messages" do

    convo = convos(:one)
    messages = convo.messages.all
    assert_not messages.length ==0
  end

end
