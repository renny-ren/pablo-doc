class CreateLogos < ActiveRecord::Migration[5.0]
  def change
    create_table :logos, &:timestamps
  end
end
