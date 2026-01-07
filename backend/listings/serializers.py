from rest_framework import serializers
from .models import Listing, ListingImage, Reservation
from reviews.models import Review
from django.db.models import Avg


# --- CHANGE 1: Define how a Review looks ---
class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.username') # Get username, not just ID
    avatar_url = serializers.SerializerMethodField() 

    class Meta:
        model = Review
        fields = ('id', 'user_name', 'avatar_url', 'rating', 'comment', 'created_at')

    def get_avatar_url(self, obj):
        if hasattr(obj.user, 'avatar') and obj.user.avatar:
            return obj.user.avatar.url
        return None

# 1. New: This tells Django how to turn the extra images into JSON
class ListingImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingImage
        fields = ('id', 'image', 'category', 'label')

# 2. Existing: Simple version for the Homepage
class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ('id', 'title', 'price', 'image')

# 3. New: Detailed version for the Listing Detail Page
class ListingDetailSerializer(serializers.ModelSerializer):
    # This line tells Django to "nest" the images inside the listing data
    images = ListingImageSerializer(many=True, read_only=True)
    landlord = serializers.SerializerMethodField()
    reviews = ReviewSerializer(many=True, read_only=True, source='review_set')
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = Listing
        fields = (
            'id',
            'title',
            'description',
            'price',
            'category',
            'make',           
            'model',          
            'year',           
            'odometer',       
            'transmission',   
            'fuel_type',      
            'address',
            'city',
            'country',
            'image',
            'landlord',
            'amenities',
            'images',
            'reviews',
            'average_rating'
        )

    def get_landlord(self, obj):
        # 1. Find all reviews for this specific landlord (across all their cars)
        reviews = Review.objects.filter(listing__landlord=obj.landlord)
        
        # 2. Calculate the math
        avg_rating = reviews.aggregate(Avg('rating'))['rating__avg']
        review_count = reviews.count()

        # 3. Return the rich data packet
        return {
            "id": obj.landlord.id,
            "username": obj.landlord.username,
            "avatar": obj.landlord.avatar.url if hasattr(obj.landlord, 'avatar') and obj.landlord.avatar else None,
            "review_count": review_count,
            "average_rating": round(avg_rating, 2) if avg_rating else 0,
            "date_joined": obj.landlord.date_joined.strftime("%Y") # e.g. "2024"
        }

    # The Math Logic: Calculates average on the fly
    def get_average_rating(self, obj):
        average = obj.review_set.aggregate(Avg('rating'))['rating__avg']
        if average:
            return round(average, 2) # Returns 4.55, 3.00, etc.
        return 0 # Returns 0 if no reviews exist

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'