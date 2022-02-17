class AddProfileIdToBookmarks < ActiveRecord::Migration[6.1]
  def change
    add_column :bookmarks, :profile_id, :integer
    add_index :bookmarks, :profile_id
  end
end
