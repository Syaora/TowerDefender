# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
g1 = Game.create(map: 'meadow')

Round.create(bonus_coin: '10', number: 1)
Round.create(bonus_coin: '13', number: 2)
Round.create(bonus_coin: '15', number: 3)
Round.create(bonus_coin: '15', number: 4)
Round.create(bonus_coin: '17', number: 5)

Enemy.create(name: "Firebug", health: 100)
Enemy.create(name: "StrongerFirebug", health: 150)
Enemy.create(name: "WeakFirebug", health: 80)

Wave.create(enemy_id: 3, spawn_count: 3, round_id: 1)

Wave.create(enemy_id: 2, spawn_count: 3, round_id: 2)
Wave.create(enemy_id: 3, spawn_count: 5, round_id: 2)

Wave.create(enemy_id: 2, spawn_count: 5, round_id: 3)
Wave.create(enemy_id: 1, spawn_count: 7, round_id: 3)
Wave.create(enemy_id: 1, spawn_count: 3, round_id: 3)

Wave.create(enemy_id: 1, spawn_count: 4, round_id: 4)
Wave.create(enemy_id: 2, spawn_count: 3, round_id: 4)
Wave.create(enemy_id: 1, spawn_count: 10, round_id: 4)
Wave.create(enemy_id: 3, spawn_count: 3, round_id: 4)

Wave.create(enemy_id: 1, spawn_count: 8, round_id: 5)
Wave.create(enemy_id: 2, spawn_count: 5, round_id: 5)
Wave.create(enemy_id: 1, spawn_count: 7, round_id: 5)
Wave.create(enemy_id: 1, spawn_count: 10, round_id: 5)

u1 = User.create(username: "Test", password: "testing")

UserGame.create(user: u1, game: g1, name: "test", coin: 50, heart: 10, round_position: 1)
UserGame.create(user: u1, game: g1, name: "test2", coin: 50, heart: 10, round_position: 1)