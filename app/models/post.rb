class Post < ApplicationRecord
    belongs_to :profile
    has_many :bookmarks, dependent: :destroy
    has_many :favorites, dependent: :destroy
    has_many :likers, through: :favorites, source: :profiles
    after_initialize :init

    def init
        self.likes ||= 0
    end
end
