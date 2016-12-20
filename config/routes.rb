Rails.application.routes.draw do
  scope '/api/v1' do
    resources :tickets
  end

  mount_ember_app :frontend, to: '/'
end
