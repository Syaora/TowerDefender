class GamesController < ApplicationController
  def show
    game = Game.find_by(id: params[:id])
    render json: game
  end

  def waves
    waves = Waves.all
    render json: waves
  end

  def rounds
    rounds = Rounds.all
    render json: rounds
  end
end
