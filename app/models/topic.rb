class Topic < ApplicationRecord
    has_many :posttopics
    has_many :usertopics

    has_many :posts, through: :posttopics, source: :posts
    has_many :users, through: :usertopics, source: :users 
end

