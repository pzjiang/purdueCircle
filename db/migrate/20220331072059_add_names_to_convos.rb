class AddNamesToConvos < ActiveRecord::Migration[6.1]
  def change
    add_column :convos, :first_name, :string
    add_column :convos, :second_name, :string
  end
end
