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
    @header = []
    @quotation = ""
    @bullet = [""]
  end

  private

  def read_file_content
    if params[:uploaded_file].nil?
      nil
    else
      (params[:uploaded_file].original_filename.match(/.*.doc/)) ? Docx::Document.open(params[:uploaded_file].path) : File.read(params[:uploaded_file].path)
    end
  end

  def separate
    doc = params[:doc].gsub(/ id=\".*\"|<br \/>\r/,"").lstrip
    @header = get_header(doc)
    
    @quotation = $1 if doc.match(/(".*")/m)
    @bold = $1 if doc.match(/(<strong>.*<\/strong>)/m)
    doc.each_line { |line|  @bullet.push $1.chomp if line.match(/(.*:.*)/m) }
    check_amend
  end

  def get_header(doc)
    if doc.match(/h[123]/)
      doc.scan(/<h[123]>.*?<\/h[123]>/m)
    else
      # doc = doc.gsub(/<.*>/).lstrip
      first_line = doc.lines.first || ""
      (first_line.include?("------")) ? doc.lines.second.chomp.split : first_line.split
    end
  end

  def check_amend
    @quotation = "" if @quotation.length > 40
    @bullet = [] if @bullet.last.length > 40
  end
end
