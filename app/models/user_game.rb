class UserGame < ApplicationRecord
  belongs_to :user 
  belongs_to :game
  validates_associated :game, :user
  # has_many :placement_tiles
  # has_many :buildings
end
