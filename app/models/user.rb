class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable #, authentication_keys: [:login]

  
  
  validates_uniqueness_of :username
  validates:username, length: {in: 4..20}
  validates :username, presence: true, uniqueness: { case_sensitive: false }
  validate :validate_username
  validates:email, format: {with: /\b[A-Z0-9._%a-z\-]+@purdue\.edu\z/, message: "must be a purdue.edu account"}

  def validate_username
    if User.where(email: username).exists?
      errors.add(:username, :invalid)
    end
  end

  attr_writer :login

  def login
    @login || self.username || self.email
  end


end
