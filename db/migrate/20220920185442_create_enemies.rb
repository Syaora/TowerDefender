class CreateEnemies < ActiveRecord::Migration[6.1]
  def change
    create_table :enemies do |t|
      t.string :image_url
      t.integer :health

      t.timestamps
    end
  end
end
