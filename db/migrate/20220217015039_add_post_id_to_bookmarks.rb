class AddPostIdToBookmarks < ActiveRecord::Migration[6.1]
  def change
    add_column :bookmarks, :post_id, :integer
    add_index :bookmarks, :post_id
  end
end
