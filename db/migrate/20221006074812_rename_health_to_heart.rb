class RenameHealthToHeart < ActiveRecord::Migration[6.1]
  def change
    rename_column :user_games, :health, :heart
  end
end
