class WaveSerializer < ActiveModel::Serializer
  attributes :id, :round_id, :spawn_count, :enemy_id
  belongs_to :round
  belongs_to :enemy
end
