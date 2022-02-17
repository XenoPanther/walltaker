Rails.application.routes.draw do
  root 'dashboard#index'
  get 'signup', to: 'users#new', as: 'signup'
  get 'login', to: 'session#new', as: 'login'
  get 'logout', to: 'session#destroy', as: 'logout'
  get 'browse', to: 'links#browse'
  resources :users
  resources :session
  resources :friendships do
    collection do
      get :requests, to: 'friendships#requests'
    end
  end
  resources :links do
    member do
      get :walltaker, to: 'links#export'
    end
  end
end
