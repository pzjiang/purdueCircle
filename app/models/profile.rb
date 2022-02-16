class Profile < ApplicationRecord
    belongs_to :user
    validates :bio, length: {in: 0...250}

end
