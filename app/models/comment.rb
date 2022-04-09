class Comment < ApplicationRecord
    belongs_to :user
    belongs_to :post
    validates :body, length: {in: 0...250}
end
