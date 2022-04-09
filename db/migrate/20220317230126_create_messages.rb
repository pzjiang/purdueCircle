class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.integer :target_id
      t.integer :origin_id
      t.string :body

      t.timestamps
    end
    add_index :messages, :target_id
    add_index :messages, :origin_id
  end
end
