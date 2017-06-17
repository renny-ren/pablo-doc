Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#index', as: 'root'

  resources :home, only: [:index, :create]

  get '/download', to: 'home#download'
  get 'start_download', to: 'home#start_download'
  post 'create_image', to: 'home#create_image'
  post '/search', to: 'home#search_image'
  get '/home/refresh_part'
  post '/upload_image', to: 'home#upload_image'
  post '/upload_logo', to: 'home#upload_logo'
 
end
