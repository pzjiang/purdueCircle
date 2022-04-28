class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable, authentication_keys: [:login]

         has_one :profile, dependent: :destroy
         has_many :posts, dependent: :destroy
         has_many :comments, dependent: :destroy
         #has_many :followers, dependent: :destroy, :foreign_key => :target
         #has_many :isfans, dependent: :destroy, :source => :followers, :foreign_key => :origin
         has_many :fans, :through => :followers, :foreign_key => :target
         has_many :followings, :through => :followers, :foreign_key => :subject

         #has_many :usertopics, dependent: :destroy
         has_many :receivedmessages, :foreign_key => :target
         has_many :sentmessages, :foreign_key => :origin
         has_many :topics, :through => :usertopics, :source => :topic
         has_many :convos, dependent: :destroy
         has_many :notifications, dependent: :destroy
         #has_many :likedposts, :through => :favorites, :source => :post
         
  
  before_save :ensure_authentication_token_is_present
  after_initialize :init

  
  validates_uniqueness_of :username
  validates :username, :email, presence: true
  validates :username, length: {in: 4..20}
  validates :username, uniqueness: { case_sensitive: false }, presence: true, allow_blank: false, format: { with: /\A[a-zA-Z0-9]+\z/ }
  validates_format_of :username, with: /^[a-zA-Z0-9_\.]*$/, :multiline => true

  validates:email, format: {with: /\b[A-Z0-9._%a-z\-]+@purdue\.edu\z/, message: "must be a purdue.edu account"}

  


  private

    def init
      self.privacy ||= false
      self.notification_count ||= 0
    end

    def send_devise_notification(notification, *args)
      devise_mailer.send(notification, self, *args).deliver_later(queue: "devise_email")
    end
      
    def self.find_for_database_authentication(warden_conditions)
      conditions = warden_conditions.dup
      if (login = conditions.delete(:login))
        where(conditions.to_hash).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
      elsif conditions.has_key?(:username) || conditions.has_key?(:email)
        where(conditions.to_hash).first
      end
    end

    def self.find_first_by_auth_conditions(warden_conditions)
      conditions = warden_conditions.dup
      if (login = conditions.delete(:login))
        where(conditions).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
      else
        if conditions[:username].nil?
          where(conditions).first
        else
          where(username: conditions[:username]).first
        end
      end
    end

    def ensure_authentication_token_is_present
      if authentication_token.blank?
        self.authentication_token = generate_authentication_token
      end
    end

    def generate_authentication_token
      loop do
        token = Devise.friendly_token
        break token unless User.where(authentication_token: token).first
      end
    end
  #attr_writer :login

  #def login
    #@login || self.username || self.email
  #end

  #def generate_jwt
    #JWT.encode({ id: id,
              #exp: 60.days.from_now.to_i },
              #Rails.application.secrets.secret_key_base)
  #end

  #validate :validate_username

  #def validate_username
    #if User.where(email: username).exists?
      #errors.add(:username, :invalid)
    #end
  #end


end
