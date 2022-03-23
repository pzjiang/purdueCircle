class Topic < ApplicationRecord
    has_many :posttopics, dependent: :destroy
    has_many :usertopics, dependent: :destroy

    has_many :posts, through: :posttopics, source: :posts
    has_many :users, through: :usertopics, source: :users 
end
