class ChangeColumnDefault < ActiveRecord::Migration[6.1]
  def change
    change_column_default :buildings, :created_at, from: nil, to: ->{ 'current_timestamp' }
    change_column_default :buildings, :updated_at, from: nil, to: ->{ 'current_timestamp' }
  end
end
