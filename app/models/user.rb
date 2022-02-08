class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable #, authentication_keys: [:login]

  
  
  validates_uniqueness_of :username
  validates:username, length: {in: 4..20}

  attr_writer :login

  def login
    @login || self.username || self.email
  end


end
