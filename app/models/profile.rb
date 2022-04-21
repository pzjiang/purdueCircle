class Profile < ApplicationRecord
    belongs_to :user
    validates :bio, length: {in: 0...250}
    has_many :posts, dependent: :destroy
    has_many :bookmarks, dependent: :destroy
    has_many :saved_posts, :through => :bookmarks, :source => :post
    has_many :favorites, dependent: :destroy
    has_one_attached :avatar
    after_initialize :init

    def init
        self.bio ||= ""
    end

end
