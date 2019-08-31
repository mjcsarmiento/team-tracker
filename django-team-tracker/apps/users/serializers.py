from rest_framework import serializers
from .models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'first_name', 'last_name', 'password', 'team', 'image_url')
        extra_kwargs = {'password': {'write_only': True}} # To make use of password during write only
    
    def create(self, validated_data):
        # Creates user based on username and password
        # After user is created, it updates other validated_data (first_name, last_name, team and image_url)
        user = CustomUser.objects.create_user(
            validated_data['username'],
            None,
            validated_data['password'])
        user.first_name = validated_data['first_name']
        user.last_name = validated_data['last_name']
        user.team = validated_data['team']

        # Includes image_url only if supplied in the form
        # This is to set image_url to default if image_url is not supplied
        if validated_data.get('image_url', False):
            user.image_url = validated_data['image_url']
        
        user.save()
        return user