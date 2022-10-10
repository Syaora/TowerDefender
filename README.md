Website https://towerproject.herokuapp.com/

## Requirements

- Ruby 2.7.4
- NodeJS (v16), and npm
- Heroku CLI
- Postgresql

## Introduction

Tower Defender is my final project at Flatiron school.  I wanted to create a game to make use of the skills I learned.  It ended up taking me a while, since I knew nothing about using sprite sheets and canvas. I even have to learn how to use a program called Tiled to help create enemy pathways, placement tiles (areas where you can place your tower), and a map!

The goal of the game is to defend against ongoing enemies from reaching the end of the path. Currently the game only has 10 rounds.

## Installation

 - Clone repo onto local machine
 - cd into folder
 - bundle install
 - rails db:create
 - rails db:migrate
 - rails db:seed
 - npm install --prefix client

## User Stories

As a user, I will be able to:
* Place down towers by clicking on the map
* Play the game after signing up/logging in
* Sign up
* Login
* Resume game
* Start a new game
* Delete a game

During gameplay, I will be able to:
* Start by pressing the start button
* Show how many lives and coins a player has
* Earn coins after a round ends
* Earn coins after killing an enemy

Stretch goals: 
* Being able to choose a map
* More enemy types
* Add more rounds

## Controls

Once the game is started, you can click on any light green area on the map to place down a tower.  Keep in mind each tower cost 50 coins!
