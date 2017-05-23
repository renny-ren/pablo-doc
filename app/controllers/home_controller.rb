class HomeController < ApplicationController
  def index
    @bullet = []
  end

  def create
    separate
    render :index
  end

  def separate
    first_line = params[:doc].lines.first
    @header = (first_line.include?("------")) ? params[:doc].lines.second.chomp : first_line
    params[:doc].each_line do |line|
      @quotation = $1 if line.match(/(".*")/)
      @bullet.push $1.chomp if line.match(/(.*:.*)/m)
    end
  end

  private

  def analysis

  end
end
