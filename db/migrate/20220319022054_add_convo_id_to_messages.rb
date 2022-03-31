class AddConvoIdToMessages < ActiveRecord::Migration[6.1]
  def change
    add_column :messages, :convo_id, :integer
    add_index :messages, :convo_id
  end
end
