from rest_framework import serializers
from . models import User
from catalogue.models import SellerCatalogue

from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        password = validated_data.get('password')
        user = get_user_model()(**validated_data)
        user.set_password(password)  # Hash the password
        user.is_staff = True  # Make the user a staff user
        user.save()

        # Assign read, update, and delete permissions for the SellerCatalogue model
        content_type = ContentType.objects.get_for_model(SellerCatalogue)
        permissions = Permission.objects.filter(
            content_type=content_type,
            codename__in=['change_sellercatalogue', 'delete_sellercatalogue', 'view_sellercatalogue']
        )
        user.user_permissions.set(permissions)
        
        return user