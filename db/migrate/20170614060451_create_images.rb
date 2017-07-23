class CreateImages < ActiveRecord::Migration[5.0]
  def change
    create_table :images, &:timestamps
  end
end
