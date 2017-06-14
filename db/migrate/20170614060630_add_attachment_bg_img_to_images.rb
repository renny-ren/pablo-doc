class AddAttachmentBgImgToImages < ActiveRecord::Migration
  def self.up
    change_table :images do |t|
      t.attachment :bg_img
    end
  end

  def self.down
    remove_attachment :images, :bg_img
  end
end
