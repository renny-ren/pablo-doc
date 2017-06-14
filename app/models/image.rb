class Image < ActiveRecord::Base
  has_attached_file :bg_img, styles: { small: "200x200>" }, default_url: "/images/:style/missing.png"
  has_attached_file :logo, styles: { small: "200x200>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :bg_img, content_type: /\Aimage\/.*\z/
  validates :bg_img, attachment_presence: true
  validates_attachment_content_type :logo, content_type: /\Aimage\/.*\z/
  validates :logo, attachment_presence: true
end