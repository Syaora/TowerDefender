class UserSerializer < ActiveModel::Serializer
  attributes :username, :id
  has_many :user_games
  # has_many :games
end
