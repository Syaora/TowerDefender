class AddRoundIdToWaves < ActiveRecord::Migration[6.1]
  def change
    add_column :waves, :round_id, :integer
  end
end
