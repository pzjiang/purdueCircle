class Post < ApplicationRecord
    belongs_to :profile
    belongs_to :user
    has_many :comments, dependent: :destroy
    has_many :bookmarks, dependent: :destroy
    has_many :favorites, dependent: :destroy
    has_many :likers, :through => :favorites, :source => :profile
    has_many :posttopics, dependent: :destroy
    has_many :topics, :through => :posttopics, :source => :topic
    validates :title, length: {in: 0...100}
    validates :body, length: {in: 0...750}

    has_one_attached :image, dependent: :destroy

    after_initialize :init

    def init
        self.likes ||= 0
    end
end

