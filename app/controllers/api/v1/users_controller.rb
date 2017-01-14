class Api::V1::UsersController < ApplicationController
  before_action :doorkeeper_authorize!

  def show
    render json: User.find(params[:id])
  end
end
