class CreateFavoritesTable < ActiveRecord::Migration[8.0]
  def change
    create_table :favorite_issues do |t|
      t.string :repository_url
      t.string :issue_url
      t.string :issue_id
      t.string :issue_title
      t.string :issue_author_name
      t.string :issue_author_profile
      t.string :issue_number
      t.timestamps
    end
  end
end
