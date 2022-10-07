class User < ApplicationRecord
  has_many :user_games
  has_many :games, through: :user_games
  validates :username, uniqueness: { case_sensitive: false }, presence: true, length: { minimum: 2 }
  validates :password_digest, presence: true
  has_secure_password

end
