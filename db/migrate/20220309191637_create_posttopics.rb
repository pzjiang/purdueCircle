class CreatePosttopics < ActiveRecord::Migration[6.1]
  def change
    create_table :posttopics do |t|
      t.integer :topic_id
      t.integer :post_id

      t.timestamps
    end
    add_index :posttopics, :topic_id
    add_index :posttopics, :post_id
  end
end
