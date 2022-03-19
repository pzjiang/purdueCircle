class CreateConvos < ActiveRecord::Migration[6.1]
  def change
    create_table :convos do |t|
      t.integer :first_user_id
      t.integer :sec_user_id
      t.integer :message_number

      t.timestamps
    end
    add_index :convos, :first_user_id
    add_index :convos, :sec_user_id
  end
end
