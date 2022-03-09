class Topic < ApplicationRecord
    has_many :posttopics
    has_many :usertopics
end

