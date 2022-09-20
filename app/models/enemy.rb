class Enemy < ApplicationRecord
  has_many :waves
  has_many :rounds, through: :waves
end
