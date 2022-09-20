class CreatePlacementTiles < ActiveRecord::Migration[6.1]
  def change
    create_table :placement_tiles do |t|
      t.integer :size
      t.array :position
      t.boolean :occupied

      t.timestamps
    end
  end
end
