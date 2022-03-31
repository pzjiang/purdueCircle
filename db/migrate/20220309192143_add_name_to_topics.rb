class AddNameToTopics < ActiveRecord::Migration[6.1]
  def change
    add_index :topics, :name, unique: true
  end
end
