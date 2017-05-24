class HomeController < ApplicationController
  before_action :initialize_options, only: [:index, :create]

  def index
  end

  def create
    @file_content = read_file_content
    separate
    render :index
  end

  def initialize_options
    @header = ""
    @quotation = ""
    @bullet = []
    @items = ["fontname","fontsize","|","forecolor","hilitecolor","bold","italic","underline","removeformat","|","justifyleft","justifycenter","justifyright","insertorderedlist","insertunorderedlist","|","image","link"]
  end

  private

  def read_file_content
    if params[:uploaded_file].nil?
      nil
    else
      (params[:uploaded_file].content_type == 'application/msword') ? Docx::Document.open(params[:uploaded_file].path) : File.read(params[:uploaded_file].path)
    end
  end

  def separate
    doc = params[:doc].gsub("<br />\r", "")
    first_line = doc.lines.first || ""
    @header = (first_line.include?("------")) ? doc.lines.second.chomp : first_line
    @quotation = $1 if doc.match(/(".*")/m)
    doc.each_line do |line|
      @bullet.push $1.chomp if line.match(/(.*:.*)/m)
    end
  end
end
