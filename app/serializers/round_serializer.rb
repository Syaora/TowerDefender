class RoundSerializer < ActiveModel::Serializer
  attributes :id, :number
  has_many :waves
  has_many :enemies
end
