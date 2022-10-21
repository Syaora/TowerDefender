class UserGameSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :name, :coin, :heart, :round_position
  belongs_to :user
  belongs_to :game
  has_many :buildings
end
