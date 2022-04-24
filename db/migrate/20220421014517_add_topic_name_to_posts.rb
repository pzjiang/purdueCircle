class AddTopicNameToPosts < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :topic_name, :string
  end
end
