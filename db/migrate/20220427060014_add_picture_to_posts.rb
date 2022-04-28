class AddPictureToPosts < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :picture, :boolean
  end
end
