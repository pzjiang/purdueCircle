class Profile < ApplicationRecord
    belongs_to :user
    validates :bio, length: {in: 0...250}
    has_many :posts, dependent: :destroy
    has_many :bookmarks, dependent: :destroy
    has_many :saved_posts, through: :bookmarks, source: :posts
    has_many :favorites, dependent: :destroy
    after_initialize :init

    def init
        self.bio ||= ""
    end

end
