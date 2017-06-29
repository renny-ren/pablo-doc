Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#index', as: 'root'

  resources :home, only: [:index, :create]

  get '/download', to: 'home#download'
  post 'start_download', to: 'home#start_download'
  post 'create_image', to: 'home#create_image'
  post '/search', to: 'home#search_image'
  get '/home/refresh_part'
  get '/home/create_image'
  post '/upload_image', to: 'home#upload_image'
  post '/upload_logo', to: 'home#upload_logo'

  get 'admin/cac', to: 'home#admin'
  post 'generate_url', to: 'home#generate_url'
  get 'generate_url', to: 'home#index'
end
