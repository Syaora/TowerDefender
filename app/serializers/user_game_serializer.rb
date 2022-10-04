class UserGameSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :name, :money, :health, :round_position
  belongs_to :user
  belongs_to :game
end
