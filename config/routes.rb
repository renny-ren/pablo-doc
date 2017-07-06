Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :users
  root 'home#landing', as: 'root'
  resources :home, only: [:index, :create]

  get 'home', to: 'home#index'
  get 'landing_page', to: 'home#landing'
  get 'download', to: 'home#download'
  get 'home/refresh_part'
  get 'home/create_image'
  get 'admin/cac', to: 'home#admin'
  get 'generate_url', to: 'home#index'

  post 'start_download', to: 'home#start_download'
  post 'create_image', to: 'home#create_image'
  post 'search', to: 'home#search_image'
  post 'upload_image', to: 'home#upload_image'
  post 'upload_logo', to: 'home#upload_logo'
  post 'generate_url', to: 'home#generate_url'
end
