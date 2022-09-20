class UserGame < ApplicationRecord
  belongs_to :user 
  has_many :placement_tiles
  has_many :buildings
end
