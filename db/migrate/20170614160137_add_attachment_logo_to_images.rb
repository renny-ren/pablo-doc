class AddAttachmentLogoToImages < ActiveRecord::Migration
  def self.up
    change_table :images do |t|
      t.attachment :logo
    end
  end

  def self.down
    remove_attachment :images, :logo
  end
end
