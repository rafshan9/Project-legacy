from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'is_host','first_name', 'last_name', 'phone_number', 'address', 'avatar_url']
        extra_kwargs = {'password': {'write_only': True}}
        
    def get_avatar_url(self, obj):
        if obj.avatar:
            return obj.avatar.url
        return None
    def create(self, validated_data):
        # We use create_user so passwords are hashed correctly
        user = User.objects.create_user(**validated_data)
        return user

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        # Add the custom data to the login response
        data['userId'] = str(self.user.id)
        data['userName'] = self.user.username
        data['is_host'] = self.user.is_host
        
        return data