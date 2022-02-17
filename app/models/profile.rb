class Profile < ApplicationRecord
    belongs_to :user
    validates :bio, length: {in: 0...250}

    has_many :posts
    has_many :bookmarks

end
