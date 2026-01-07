from rest_framework import serializers
from .models import Booking

class BookingSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    
    class Meta:
        model = Booking
        # We keep the fields, but you might want to remove start_date/end_date later
        fields = ['id', 'user', 'listing', 'start_date', 'end_date', 'total_price', 'status']

    def validate(self, data):
        # I removed the date logic because cars don't have check-in/check-out collisions
        return data