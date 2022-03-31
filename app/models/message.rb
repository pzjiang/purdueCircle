class Message < ApplicationRecord
    belongs_to :origin, :class_name => "User"
    belongs_to :target, :class_name => "User"
    belongs_to :convo

    #validate length of message
    validates :body, length: {in: 0...250}


end
