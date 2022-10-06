class UserGamesController < ApplicationController
  def games
    user_games = UserGame.where(user_id: current_user.id)
    render json: user_games, status: :ok
  end

  def create
    game = Game.find_by(map: "meadow") #temp
    user_game = UserGame.create!(
      user_id: params[:user_id],
      game_id: game.id, #Map --- needs to be updated later to allow different maps
      name: params[:name],
      heart: 10,
      coin: 50,
      round_position: 1
    )
    render json: user_game, status: :ok
  end

  def show
    user_game = UserGame.find_by(id: params[:id])
    if user_game
      render json: user_game, status: :ok
    else
      render_not_found
    end
  end

  def update
    user_game = UserGame.find_by(id: params[:id])
    if user_game
      user_game.update!(user_game_params)
      render json: user_game, status: :accepted
    else
      render_not_found
    end
  end

  def destroy
    user_game = UserGame.find_by(id: params[:id])
    if user_game
      user_game.destroy
      head :no_content
    else
      render_not_found
    end
  end

  private

  def user_game_params
    params.permit(:user_id, :game_id, :name, :coin, :heart, :round_position)
  end
end
