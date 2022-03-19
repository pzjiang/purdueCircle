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

ActiveRecord::Schema.define(version: 2022_03_19_022054) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bookmarks", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "profile_id"
    t.integer "post_id"
    t.index ["post_id"], name: "index_bookmarks_on_post_id"
    t.index ["profile_id"], name: "index_bookmarks_on_profile_id"
  end

  create_table "convos", force: :cascade do |t|
    t.integer "first_user_id"
    t.integer "sec_user_id"
    t.integer "message_number"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["first_user_id"], name: "index_convos_on_first_user_id"
    t.index ["sec_user_id"], name: "index_convos_on_sec_user_id"
  end

  create_table "favorites", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "profile_id"
    t.integer "post_id"
    t.index ["post_id"], name: "index_favorites_on_post_id"
    t.index ["profile_id"], name: "index_favorites_on_profile_id"
  end

  create_table "messages", force: :cascade do |t|
    t.integer "target_id"
    t.integer "origin_id"
    t.string "body"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "convo_id"
    t.index ["convo_id"], name: "index_messages_on_convo_id"
    t.index ["origin_id"], name: "index_messages_on_origin_id"
    t.index ["target_id"], name: "index_messages_on_target_id"
  end

  create_table "posts", force: :cascade do |t|
    t.string "title"
    t.text "body"
    t.integer "likes"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "profile_id"
    t.integer "user_id"
    t.boolean "privacy"
    t.index ["profile_id"], name: "index_posts_on_profile_id"
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "posttopics", force: :cascade do |t|
    t.integer "topic_id"
    t.integer "post_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["post_id"], name: "index_posttopics_on_post_id"
    t.index ["topic_id"], name: "index_posttopics_on_topic_id"
  end

  create_table "profiles", force: :cascade do |t|
    t.text "bio"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "user_id"
    t.boolean "privacy"
    t.index ["user_id"], name: "index_profiles_on_user_id"
  end

  create_table "topics", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_topics_on_name", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "username"
    t.string "authentication_token"
    t.string "first_name"
    t.string "last_name"
    t.index ["authentication_token"], name: "index_users_on_authentication_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  create_table "usertopics", force: :cascade do |t|
    t.integer "topic_id"
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["topic_id"], name: "index_usertopics_on_topic_id"
    t.index ["user_id"], name: "index_usertopics_on_user_id"
  end

end
