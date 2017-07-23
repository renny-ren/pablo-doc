class Logo < ApplicationRecord
  has_attached_file :logo, styles: { small: '100x100>' }, default_url: '/images/:style/missing.png'
  validates_attachment_content_type :logo, content_type: /\Aimage\/.*\z/
  validates :logo, attachment_presence: true
end
