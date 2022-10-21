class BuildingsController < ApplicationController
  def create
    newBuildings = Building.insert_all(buildings_params, returning: [:id, :x, :y, :user_game_id])
    byebug
    render json: newBuildings
  end

  def show
    towers = Building.where(user_game_id: params[:user_game_id])
    render json: towers, status: :ok
  end

  private

  def buildings_params
    params.permit(newBuildings: [:x, :y, :user_game_id]).require(:newBuildings)
  end
end
