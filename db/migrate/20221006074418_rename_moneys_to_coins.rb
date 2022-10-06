class RenameMoneysToCoins < ActiveRecord::Migration[6.1]
  def change
    rename_column :user_games, :money, :coin
  end
end
