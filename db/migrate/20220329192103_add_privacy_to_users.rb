class AddPrivacyToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :privacy, :boolean
  end
end
