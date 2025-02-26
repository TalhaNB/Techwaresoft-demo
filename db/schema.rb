# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_02_26_135825) do
  create_table "favorite_issues", force: :cascade do |t|
    t.string "repository_url"
    t.string "issue_url"
    t.string "issue_id"
    t.string "issue_title"
    t.string "issue_author_name"
    t.string "issue_author_profile"
    t.string "issue_number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "favorites", force: :cascade do |t|
    t.string "repo_name"
    t.string "issue_url"
    t.string "issue_id"
    t.string "issue_title"
    t.string "issue_author_name"
    t.string "issue_author_profile"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "issue_number"
  end
end
