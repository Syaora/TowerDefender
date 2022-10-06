class RoundSerializer < ActiveModel::Serializer
  attributes :id, :number, :bonus_coin
  has_many :waves
  has_many :enemies
end
