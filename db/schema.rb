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

ActiveRecord::Schema.define(version: 2022_09_20_185442) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "buildings", force: :cascade do |t|
    t.integer "radius"
    t.integer "width"
    t.string "image_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "enemies", force: :cascade do |t|
    t.string "image_url"
    t.integer "health"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "games", force: :cascade do |t|
    t.string "map"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "placement_tiles", force: :cascade do |t|
    t.integer "size"
    t.integer "positionx"
    t.integer "positiony"
    t.boolean "occupied"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "rounds", force: :cascade do |t|
    t.integer "money"
    t.integer "number"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "user_games", force: :cascade do |t|
    t.integer "user_id"
    t.integer "game_id"
    t.string "name"
    t.integer "money"
    t.integer "health"
    t.integer "round_position"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "waves", force: :cascade do |t|
    t.integer "enemy_id"
    t.integer "spawn_count"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
