class AddPhotoToProfiles < ActiveRecord::Migration[6.1]
  def change
    add_column :profiles, :photo, :string
  end
end
