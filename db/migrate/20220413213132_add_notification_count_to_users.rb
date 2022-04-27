class AddNotificationCountToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :notification_count, :integer
  end
end
