# README

# ChatSpace DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|password|string|null: false|
|email|string|null: false|
### Association
- has_many :groups, through: :group_users 
- has_many :messages

## messagesテーブル
|Column|Type|Option|
|------|----|------|
|message|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|image|string|
### Association
- belongs_to :user
- belongs_to :groups

## groupsテーブル
|Column|Type|Option|
|------|----|------|
|name|string|null: false|
|user_id|integer|null: false, foreign_key: true|
|message_id|integer|foreign_key: true|
### Association
- has_many :users, through: group_users
- has_many :messages

## group_usersテーブル
|Column|Type|Option|
|------|----|------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group