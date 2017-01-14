class UsersController < ApplicationController
  before_action :doorkeeper_authorize!

  def me
    render json: current_user
  end
end
