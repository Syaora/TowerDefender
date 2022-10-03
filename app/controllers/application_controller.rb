class ApplicationController < ActionController::API
  before_action :authenticate_user
  include ActionController::Cookies
  
  def current_user
    @current_user ||= User.find_by_id(session[:user_id])
  end

  private

  def authenticate_user #check if user is login
    render json: { errors: { User: "Not Authorized" } }, status: :unauthorized unless current_user
  end

end
