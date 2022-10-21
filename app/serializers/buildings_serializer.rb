class BuildingsSerializer < ActiveModel::Serializer
  attributes :id, :x, :y, :user_game_id
  belongs_to :user_game
end
