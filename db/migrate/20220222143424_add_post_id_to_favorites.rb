class AddPostIdToFavorites < ActiveRecord::Migration[6.1]
  def change
    add_column :favorites, :post_id, :integer
    add_index :favorites, :post_id
  end
end
