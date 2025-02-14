from django.contrib.auth.base_user import BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, **extrafields):
        if not email:
            return ValueError('email must be set')
        if not password:
            return ValueError('password must be set')
        email=self.normalize_email(email)
        user=self.model(email=email, **extrafields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self, email, password, **extrafields):
        extrafields.setdefault('is_staff', True)
        extrafields.setdefault('role', 'admin')
        extrafields.setdefault('is_superuser', True)
        if extrafields.get('is_superuser') is not True:
            raise ValueError('the superuser must be set is_superuser=true')
        return self.create_user(email, password, **extrafields)