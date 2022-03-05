class AddPrivacyToProfiles < ActiveRecord::Migration[6.1]
  def change
    add_column :profiles, :privacy, :boolean
  end
end
