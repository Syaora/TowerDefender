class UserGamesController < ApplicationController
  def index
    user_games = UserGame.all 
    render json: user_games
  end

  def create
    user_game = UserGame.create(user_game_params)
    render json: user_game, status: :created
  end

  def show
    user_game = UserGame.find_by(id: params[:id])
    if user_game
      render json: user_game
    else
      render_not_found_response
    end
  end

  def update
    user_game = UserGame.find_by(id: params[:id])
    if user_game
      user_game.update(user_game)
      render json: user_game 
    else
      render_not_found_response
    end
  end

  def destroy
    user_game = UserGame.find_by(id: params[:id])
    if user_game
      user_game.destroy
      head :no_content
    else
      render_not_found_response
    end
  end

  private

  def user_game_params
    params.permit(:user_id, :game_id, :nmame, :money, :heatlh, :round_position)
  end

  def render_not_found_response
    render json: { error: "Game not found" }, status: :not_found
  end
end
