class CreateFollowers < ActiveRecord::Migration[6.1]
  def change
    create_table :followers do |t|
      t.integer :subject
      t.integer :target

      t.timestamps
    end
    add_index :followers, :subject
    add_index :followers, :target
  end
end
