# CS 307 Project - PurdueCircle
### Derek Lee, Maitri Parikh, Peter Jiang, Sylvia Liu, Vee Anog

## System Dependencies
    ruby 3.0.3p157
    postgres
    rails

## Configuration
In order to run the server locally, you will need to create a role in postgres called "purduecircle".

## Database Creation
A Database called purdueCircle_development and purdueCircle_team are required.

Create database using rails:
```
rails db:create
rails db:migrate
```

## Database initialization

## How to run the test suite
N/A

## Services (job queues, cache servers, search engines, etc.)
N/A

## Installation - Postgres, Ruby on Rails

Use the package manager [homebrew](https://brew.sh) to install homebrew.
```bash /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"```

Then install Ruby, Rails, and Postgres
```
brew install ruby
brew install rbenv ruby-build
brew install postgresql
```

## Deployment Instructions

1) Make sure you go to https://www.postgresql.org/ and download the latest version.

2) Access postgres SQL terminal using 
```psql postgres```

3) Create a role named purduecircle, with the password 'password1' (to match configuration in config/database.yml). Make sure that you grant CREATEDB and LOGIN access.
```CREATE ROLE purduecircle CREATEDB LOGIN```

4) Create a database using rails and migrate:
```
rails db:create
rails db:migrate
```

4) Start the server using
```rails s```

5) Access site with URL localhost:3000

