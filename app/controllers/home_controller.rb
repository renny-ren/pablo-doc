class HomeController < ApplicationController
  http_basic_authenticate_with name: 'cac', password: 'cac123321', only: :admin
  before_action :initialize_options, only: [:index, :create, :generate_url, :search_image, :refresh_part]
  skip_before_action :verify_authenticity_token

  def initialize_options
    @header = []
    @quotation = ['']
    @bullet = ['']
    @bold = ['']
    @images = { batch_2_full_size: (1..52).to_a.sample(10), full_size: (1..33).to_a.sample(10) }
    @img_link = []
    @upload_images = Image.all
    @upload_logos = Logo.all
  end

  def index
    redirect_to root_path unless user_signed_in?
    Image.all.destroy_all
    Logo.all.destroy_all
  end

  def landing
    render layout: 'landing'
  end

  def create
    @content = params[:doc]
    separate
    render :index
  end

  def generate_url
    @content = read_content
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
        if link.uri.to_s =~ /\/photo.*\d\/$/
          page = link.click
          page.links.each do |img_link|
            @img_link << (img_link.uri.to_s + '?h=650').gsub!('static', 'images') if img_link.uri.to_s =~ /https:\/\/static\..*\..*g$/
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
    @logo_src = params[:logo_src]
    get_variable

    render layout: false
  end

  def start_download
    send_file(
      "#{Rails.root}/public/share_download_#{@@salt}.png",
      filename: 'Cactusly.png'
    )
  end

  def create_image
    set_variable
    session[:text] = params[:download_text].strip
    session[:image] = params[:download_src]
    @@salt = Array.new(10) { rand(1024).to_s(36) }.join
    @salt = @@salt

    # new_uri = "http://localhost:3000/download?download_src=#{params[:download_src]}&logo_src=#{params[:logo_src]}"
    new_uri = "https://word-doc.herokuapp.com/download?download_src=#{params[:download_src]}&logo_src=#{params[:logo_src]}"
    f = Screencap::Fetcher.new(new_uri)
    f.fetch(
      output: "public/share_download_#{@@salt}.png", # don't forget the extension!
      div: '.download-content', # selector for a specific element to take screenshot of
      width: 760,
      height: 484,
    # :top => 0, :left => 0, :width => 100, :height => 100 # dimensions for a specific area
    )
  end

  def admin; end

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
    session[:url] = params[:url]
    if params[:url].empty?
      params[:doc]
    else
      if params[:url] =~ /.*\..*/
        unless params[:url] =~ /^http.*/
          url = 'https://' + params[:url]
          session[:url] = url
        end
        url.nil? ? Nokogiri::HTML(open(params[:url])) : Nokogiri::HTML(open(url))
      else
        ''
      end
    end
  end

  def separate
    unless params[:doc].empty?
      doc = params[:doc].gsub(/ id=\".*\"|<br \/>\r/, '').lstrip
      @header = get_header(doc)
      @quotation = get_quotation(doc)
      @bold = get_bold(doc)
      @bullet = get_bullet(doc)
    end
  end

  def get_header(doc)
    if doc =~ /h[123]/ # if there is heading format text, return them as header
      doc.scan(/<h[123]>.*?<\/h[123]>/m)
    else # if there is no heading, first or second line would be header
      doc = doc.gsub(/<.*>/, '').lstrip
      first_line = doc.lines.first || ''
      first_line.include?('------') ? doc.lines.second.chomp.split : first_line.split
    end
  end

  def get_bold(doc)
    doc.scan(/<strong>.*?<\/strong>/m)
  end

  def get_quotation(doc)
    doc = doc.gsub(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/i, '').gsub(/<[^>]+?>/, '').gsub(/\s+/, ' ').tr(' ', ' ').tr('>', ' ')
    doc.scan(/(".*?"|“.*?”)/m).flatten if doc.scan(/(".*?"|“.*?”)/m)
  end

  def get_bullet(doc)
    doc.scan(/<li>.*?<\/li>/m).flatten
  end
end
