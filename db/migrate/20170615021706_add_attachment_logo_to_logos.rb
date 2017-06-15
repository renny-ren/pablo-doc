class AddAttachmentLogoToLogos < ActiveRecord::Migration
  def self.up
    change_table :logos do |t|
      t.attachment :logo
    end
  end

  def self.down
    remove_attachment :logos, :logo
  end
end
