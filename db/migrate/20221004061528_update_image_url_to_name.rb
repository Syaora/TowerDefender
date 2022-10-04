class UpdateImageUrlToName < ActiveRecord::Migration[6.1]
  def change
    rename_column :enemies, :image_url, :name
  end
end
