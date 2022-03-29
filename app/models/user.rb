class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable #, authentication_keys: [:login]

         has_one :profile, dependent: :destroy
         has_many :posts, dependent: :destroy
         has_many :comments, dependent: :destroy
         
  
  before_save :ensure_authentication_token_is_present
  after_initialize :init

  
  validates_uniqueness_of :username
  validates :username, :email, presence: true
  validates :username, length: {in: 4..20}
  validates :username, uniqueness: { case_sensitive: false }, presence: true, allow_blank: false, format: { with: /\A[a-zA-Z0-9]+\z/ }
  #validates :username, presence: true, uniqueness: { case_sensitive: false }

  validates:email, format: {with: /\b[A-Z0-9._%a-z\-]+@purdue\.edu\z/, message: "must be a purdue.edu account"}


  private

    def init
      self.privacy ||= false
    end

    def send_devise_notification(notification, *args)
      devise_mailer.send(notification, self, *args).deliver_later(queue: "devise_email")
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


end
