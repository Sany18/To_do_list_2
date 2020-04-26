class AddImageToTask < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :image, :text
  end
end
