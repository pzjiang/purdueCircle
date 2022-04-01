require "test_helper"

class MessageTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  test "invalid message no convo id" do
    message = Message.create(origin_id: 1, target_id: 2, body: "none")
    assert_not message.save
  end
  
  test "valid message with convo id" do
    message = Message.create(origin_id: 1, target_id: 2, body: "none", convo_id: 1)
    assert message.save
  end

  test "invalid message too long" do
    message = Message.create(origin_id: 1, target_id: 2, body: "0123456012345678901234567890123456789012345678901234567890123456701234560123456789012345678901234567890123456789012345678901234567897890123456012345678901234567890123456789012345678901234567890123456789789012345601234567890123456789012345678901234567890123456789012345678978901234560123456789012345678901234567890123456789012345678901234567897890123456012345678901234567890123456789012345678901234567890123456789789012345601234567890123456789012345678901234567890123456789012345678978901234560123456789012345678901234567890123456789012345678901234567897890123456012345678901234567890123456789012345678901234567890123456789789012345601234567890123456789012345678901234567890123456789012345678978989789",convo_id: 1)
    assert_not message.save
  end
  
  test "invalid message ids not valid" do
    message = Message.create(origin_id: 10, target_id: 2, body: "none", convo_id: 1)
    assert_not message.save
  end

end