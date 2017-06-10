class HomeController < ApplicationController
  before_action :initialize_options, only: [:index, :create, :search_image, :refresh_part]

  def index
  end

  def create
    @content = read_content
    separate
    render :index
  end

  def initialize_options
    @header = []
    @quotation = [""]
    @bullet = [""]
    @bold = [""]
    @images = { batch_2_full_size: (1..52).to_a.sample(10), full_size: (1..33).to_a.sample(10) }
    @img_link = []
  end

  def refresh_part 
    respond_to do |format|
      format.js 
    end
  end

  def search_image
    unless params[:search_image].empty?
      page = Mechanize.new.get("https://www.pexels.com/search/#{params[:search_image]}")
      page.links.each do |link|
        if link.uri.to_s.match(/\/photo.*\d\/$/)
          page = link.click
          page.links.each do |img_link|
            @img_link << (img_link.uri.to_s + "?h=650").gsub!('static', 'images') if img_link.uri.to_s.match(/https:\/\/static\..*\..*g$/)
          end
        else
          next
        end
      end
      @img_link.uniq!
    end
    p @img_link
  end

  def download
    render layout: false
  end

  private

  def read_content
    # if params[:uploaded_file].nil?
    #   params[:doc]
    # else
    #   (params[:uploaded_file].original_filename.match(/.*.doc/)) ? Docx::Document.open(params[:uploaded_file].path) : File.read(params[:uploaded_file].path)
    # end
    if params[:url].empty?  
      params[:doc] 
    else
      if params[:url].match(/.*\..*/)
        url = "http://" + params[:url] unless params[:url].match(/^http.*/)
        url.nil? ? Nokogiri::HTML(open(params[:url])) : Nokogiri::HTML(open(url))
      else
        ""
      end
    end
  end

  def separate
    unless params[:doc].empty?
      doc = params[:doc].gsub(/ id=\".*\"|<br \/>\r/,"").lstrip
      @header = get_header(doc)    
      @quotation = get_quotation(doc)
      @bold = get_bold(doc)
      @bullet = get_bullet(doc)
      # check_length
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
    doc = doc.gsub(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/i,'').gsub(/<[^>]+?>/,'').gsub(/\s+/,' ').gsub(/ /,' ').gsub(/>/,' ')
    doc.scan(/(".*?"|“.*?”)/m).flatten if doc.scan(/(".*?"|“.*?”)/m)
  end

  def get_bullet(doc)
    doc.scan(/<li>.*?<\/li>/m).flatten
    # ^.{1,10}:.*{1,10}$|
  end

  def check_length
    # @quotation = [""] if @quotation.first.length > 60 
  end
end
