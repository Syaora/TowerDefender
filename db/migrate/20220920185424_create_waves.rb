class CreateWaves < ActiveRecord::Migration[6.1]
  def change
    create_table :waves do |t|
      t.integer :enemy_id
      t.integer :spawn_count

      t.timestamps
    end
  end
end
