class AddProfileIdToPosts < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :profile_id, :integer
    add_index :posts, :profile_id
  end
end
