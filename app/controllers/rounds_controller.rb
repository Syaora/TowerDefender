class RoundsController < ApplicationController
  def show
    round = Round.find_by(number: params[:id])
    render json: round, status: :ok
  end
end
