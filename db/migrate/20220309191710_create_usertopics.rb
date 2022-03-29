class CreateUsertopics < ActiveRecord::Migration[6.1]
  def change
    create_table :usertopics do |t|
      t.integer :topic_id
      t.integer :user_id

      t.timestamps
    end
    add_index :usertopics, :topic_id
    add_index :usertopics, :user_id
  end
end
