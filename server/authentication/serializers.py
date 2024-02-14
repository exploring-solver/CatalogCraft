from rest_framework import serializers
from . models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    # overriding create method so that password gets hashed when we create an object
    def create(self, validated_data):
        password = validated_data.get('password')
        user = User(**validated_data)
        user.set_password(password)  # Hash the password
        user.save()
        return user