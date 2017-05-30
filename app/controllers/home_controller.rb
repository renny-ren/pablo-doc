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
    @quotation = [""]
    @bullet = [""]
    @bold = [""]
    @images = { batch_2_thumbnail: (1..74).to_a.sample(5), thumbnail: (1..33).to_a.sample(5) }
  end

  private

  def read_file_content
    # if params[:uploaded_file].nil?
    #   params[:doc]
    # else
    #   (params[:uploaded_file].original_filename.match(/.*.doc/)) ? Docx::Document.open(params[:uploaded_file].path) : File.read(params[:uploaded_file].path)
    # end
    if params[:url].empty?
      params[:doc]
    else
      Nokogiri::HTML(open(params[:url]))
    end
  end

  def separate
    unless params[:doc].empty?
      doc = params[:doc].gsub(/ id=\".*\"|<br \/>\r/,"").lstrip
      @header = get_header(doc)    
      @quotation = get_quotation(doc)
      @bold = get_bold(doc)
      @bullet = get_bullet(doc)
      check_length
    end
  end

  def get_header(doc)
    if doc.match(/h[123]/)  # if there is heading format text, return them as header
      doc.scan(/<h[123]>.*?<\/h[123]>/m)
    else  # if there is no heading, first or second line would be header
      doc = doc.gsub(/<.*>/,"").lstrip
      first_line = doc.lines.first || ""
      (first_line.include?("------")) ? doc.lines.second.chomp.split : first_line.split
    end
  end

  def get_bold(doc)
    doc.scan(/<strong>.*?<\/strong>/m)
  end

  def get_quotation(doc)
    doc.scan(/(".*?")/m).flatten if doc.scan(/(".*?")/m)
  end

  def get_bullet(doc)
    doc.scan(/^.{1,15}:.*{1,20}$|<ul>.*?<\/ul>/m).flatten
    # doc.each_line { |line|  @bullet.push $1.chomp if line.match(/(.*:.*)/m) or line.match(/<ul>.*?<\/ul>/m) }
  end

  def check_length
    @quotation = [""] if @quotation.length > 10 
  end
end
