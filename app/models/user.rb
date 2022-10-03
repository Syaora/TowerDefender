class User < ApplicationRecord
  has_many :user_games
  # has_many :games, through: :user_games
  validates :username, uniqueness: true
  has_secure_password

end
