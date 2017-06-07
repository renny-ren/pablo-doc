Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#index', as: 'root'

  resources :home

  get '/download', to: 'home#download'
 
end
