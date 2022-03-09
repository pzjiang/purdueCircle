class Post < ApplicationRecord
    belongs_to :profile
    belongs_to :user
    has_many :bookmarks, dependent: :destroy
    has_many :favorites, dependent: :destroy
    has_many :likers, through: :favorites, source: :profiles
    has_many :topics, through: :posttopics, source: :topics
    validates :title, length: {in: 0...100}
    validates :body, length: {in: 0...500}
    after_initialize :init

    def init
        self.likes ||= 0
    end
end

