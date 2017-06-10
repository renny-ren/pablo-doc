Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#index', as: 'root'

  resources :home, only: [:index, :create]

  get '/download', to: 'home#download'
  post '/search', to: 'home#search_image'
  # get '/search', to: 'home#search_image'
  get '/home/refresh_part', to: 'home#refresh_part'
 
end
