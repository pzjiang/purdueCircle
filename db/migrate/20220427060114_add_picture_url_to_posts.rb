class AddPictureUrlToPosts < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :picture_url, :string
  end
end
