class BuildingsController < ApplicationController
  def create
    buildings = Building.insert_all(buildings_params, returning: [:id, :x, :y])
    render json: buildings
  end

  def show
    towers = Building.where(user_game_id: params[:user_game_id])
    render json: towers, status: :ok
  end

  def self.insert_all(records)
    normalized = normalize(records)
    super(normalized)
  end

  def self.normalize(records)
    records.each do |rec|
      add_timestamp(rec)
    end
  end

  def self.add_timestamp(record)
    time = Time.now.utc 

    record['created_at'] = time
    record['updated_at'] = time
  end
end
