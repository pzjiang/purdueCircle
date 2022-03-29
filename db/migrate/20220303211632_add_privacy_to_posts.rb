class AddPrivacyToPosts < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :privacy, :boolean
  end
end
