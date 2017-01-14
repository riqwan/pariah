Rails.application.routes.draw do
  devise_for :users, path: 'api/v1/users', controllers: { registrations: 'users/registrations' }, defaults: { format: :json }

  scope '/api/v1' do
    use_doorkeeper scope: 'oauth2'

    get 'users/me', to: 'users#me'
  end

  namespace :api do
    namespace :v1 do
      resources :users, only: [:show]
    end
  end

  mount_ember_app :frontend, to: '/'
end
