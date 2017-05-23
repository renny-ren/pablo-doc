class HomeController < ApplicationController
  def index
    @bullet = []
  end

  def create
    separate
    @file_content = params[:uploaded_file].nil? ? nil : params[:uploaded_file].read
    render 'index'
  end

  def separate
    first_line = params[:doc].lines.first || ""
    @bullet = []
    @header = (first_line.include?("------")) ? params[:doc].lines.second.chomp : first_line
    params[:doc].each_line do |line|
      @quotation = $1 if line.match(/(".*")/)
      @bullet.push $1.chomp if line.match(/(.*:.*)/m)
    end
  end
end