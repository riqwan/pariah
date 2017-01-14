class ApplicationController < ActionController::Base
  respond_to :json

  def current_user
    @current_user ||= User.where(id: doorkeeper_token.resource_owner_id).first if doorkeeper_token
  end

  def strong_params
    ActionController::Parameters
      .new(ActiveModelSerializers::Deserialization.jsonapi_parse(params))
  end

  def render_unprocessable_entity(resource)
    render json: resource,
      serializer: ActiveModel::Serializer::ErrorSerializer,
      status: :unprocessable_entity
  end
end
