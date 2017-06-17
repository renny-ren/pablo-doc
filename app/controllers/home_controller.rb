class HomeController < ApplicationController
  before_action :initialize_options, only: [:index, :create, :search_image, :refresh_part]
  skip_before_action :verify_authenticity_token

  def initialize_options
    @header = []
    @quotation = [""]
    @bullet = [""]
    @bold = [""]
    @images = { batch_2_full_size: (1..52).to_a.sample(10), full_size: (1..33).to_a.sample(10) }
    @img_link = []
    @upload_images = Image.all
    @upload_logos = Logo.all
  end

  def index
    Image.all.destroy_all
    Logo.all.destroy_all
  end

  def create
    @content = read_content
    separate
    render :index
  end

  def upload_image
    Image.create(image_params)
  end

  def upload_logo
    Logo.create(logo_params)
  end

  # def remove_logo
  #   @upload_logo.logo = nil
  #   @upload_logo.save
  # end

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
  end

  def download
    @download_src = params[:download_src]
    get_variable

    render layout: false
  end

  def start_download
    unless gon.image_height.nil?
      send_file(
        "#{Rails.root}/screenshots/share_download.png",
        filename: "engaging-image.png"
      )
    end
  end

  def create_image
    # require 'open-uri'
    # download = open('https://d3ijcis4e2ziok.cloudfront.net/engaging-images-backgrounds/thumbnail/13.jpg')
    # IO.copy_stream(download, 'screenshots/image.png')
    
    # respond_to do |format|
    #   format.js { render 'download' } #make_a_change.js.erb
    # end
   set_variable

    new_uri = "http://localhost:3000/download?download_src=#{params[:download_src]}"
    f = Screencap::Fetcher.new(new_uri)
    screenshot = f.fetch(
      output: 'screenshots/share_download.png',    # don't forget the extension!
      div: '.download-content',   # selector for a specific element to take screenshot of
      width: 760,
      height: 484,
      # :top => 0, :left => 0, :width => 100, :height => 100 # dimensions for a specific area
    )
  end

  def set_variable
    @@image_height = params[:image_height]
    @@image_width = params[:image_width]
    @@image_left = params[:image_left]
    @@image_filter = params[:image_filter]
    @@download_text = params[:download_text]
    @@font_size = params[:font_size]
    @@font_top = params[:font_top]
    @@font_family = params[:font_family]
    @@font_weight = params[:font_weight]
    @@font_style = params[:font_style]
    @@font_color = params[:font_color]
  end

  def get_variable
    gon.image_height = @@image_height
    gon.image_width = @@image_width
    gon.image_left = @@image_left
    gon.image_filter = @@image_filter
    gon.download_text = @@download_text
    gon.font_size = @@font_size
    gon.font_top = @@font_top
    gon.font_family = @@font_family
    gon.font_weight = @@font_weight
    gon.font_style = @@font_style
    gon.font_color = @@font_color
  end

  private

  def image_params
    params.permit(:bg_img)
  end

  def logo_params
    params.permit(:logo)
  end

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
