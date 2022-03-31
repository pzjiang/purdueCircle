class UserMailer < Devise::Mailer
  helper :application
  helper UsersHelper
  include Devise::Controllers::UrlHelpers
  default template_path: '../views/devise/mailer'
end