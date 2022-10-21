class CreateBuildings < ActiveRecord::Migration[6.1]
  def change
    create_table :buildings do |t|
      t.integer :x
      t.integer :y
      t.integer :user_game_id

      t.timestamps
    end
  end
end
