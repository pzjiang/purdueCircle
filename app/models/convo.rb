class Convo < ApplicationRecord
    belongs_to :first_user, :class_name => "User"
    belongs_to :sec_user, :class_name => "User"
    has_many :messages, dependent: :destroy

end
