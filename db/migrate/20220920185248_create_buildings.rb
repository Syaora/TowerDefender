class CreateBuildings < ActiveRecord::Migration[6.1]
  def change
    create_table :buildings do |t|
      t.integer :radius
      t.integer :width
      t.string :image_url

      t.timestamps
    end
  end
end
