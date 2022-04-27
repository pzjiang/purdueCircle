class CreateNotifications < ActiveRecord::Migration[6.1]
  def change
    create_table :notifications do |t|
      t.integer :user_id
      t.string :body
      t.integer :origin
      t.boolean :read
      t.integer :source

      t.timestamps
    end
    add_index :notifications, :user_id
  end
end
