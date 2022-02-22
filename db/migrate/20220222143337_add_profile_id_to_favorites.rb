class AddProfileIdToFavorites < ActiveRecord::Migration[6.1]
  def change
    add_column :favorites, :profile_id, :integer
    add_index :favorites, :profile_id
  end
end
