class AddBlockedToFollowers < ActiveRecord::Migration[6.1]
  def change
    add_column :followers, :blocked, :boolean
  end
end
