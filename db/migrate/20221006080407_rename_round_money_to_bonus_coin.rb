class RenameRoundMoneyToBonusCoin < ActiveRecord::Migration[6.1]
  def change
    rename_column :rounds, :money, :bonus_coin
  end
end
