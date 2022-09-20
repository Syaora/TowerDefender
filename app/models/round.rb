class Round < ApplicationRecord
  has_many :waves
  has_many :enemies, through: :waves
end
