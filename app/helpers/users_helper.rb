module UsersHelper
    def custom_confirmation_path(resource, confirmation_token: nil)
        if resource.class == User
          return frontend_user_confirmation_url(confirmation_token)
        end
        confirmation_url(resource, confirmation_token: confirmation_token)
      end    
end
