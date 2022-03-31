class Follower < ApplicationRecord
    self.table_name = "followers"
    #subject is the one following
    #target is the one followed
    belongs_to :follower, :class_name => "User", :foreign_key => "subject"
    belongs_to :followed, :class_name => "User", :foreign_key => "target"
end
