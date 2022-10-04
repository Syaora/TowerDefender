class ApplicationController < ActionController::API
  before_action :authenticate_user
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordInvalid, with:
  :render_unprocessable_entity
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  
  def current_user
    @current_user ||= User.find_by_id(session[:user_id])
  end

  private

  def authenticate_user #check if user is login
    render json: { errors: { User: "Not Authorized" } }, status: :unauthorized unless current_user
  end

  def render_unprocessable_entity(invalid)
    render json: { errors: invalid.record.errors }, status: :render_unprocessable_entity
  end

  def render_not_found(error)
    render json: { errors: { error.model => "Not Found" }}, status: :render_not_found
  end

end
