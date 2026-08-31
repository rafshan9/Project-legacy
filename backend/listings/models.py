import uuid
from django.db import models
from django.conf import settings

class Listing(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # --- GROCERY FIELDS ---
    brand = models.CharField(max_length=100, default='')      # e.g., "FreshFarms"
    weight = models.CharField(max_length=50, default='')      # e.g., "500g", "1L"
    dietary_preference = models.CharField(max_length=50, choices=[
        ('none', 'None'), 
        ('organic', 'Organic'),
        ('vegan', 'Vegan'),
        ('gluten_free', 'Gluten-Free')
    ], default='none')
    
    # --- STANDARD FIELDS (Kept from before) ---
    title = models.CharField(max_length=255) # Product Name
    description = models.TextField()
    price = models.IntegerField()
    category = models.CharField(max_length=255) # e.g., "Produce", "Dairy"
    
    # --- LOCATION (Kept) ---
    address = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    country = models.CharField(max_length=255, blank=True, null=True)
    
    # --- EXTRAS ---
    amenities = models.JSONField(default=list, blank=True) # Can store "Sunroof", "Turbo", etc.
    
    # --- RELATIONSHIPS ---
    landlord = models.ForeignKey('users.User', related_name='listings', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='uploads/listings')
    created_at = models.DateTimeField(auto_now_add=True)

    # --- DELETED FIELDS ---
    # bedrooms, bathrooms, guests removed.

    def __str__(self):
        return self.title


class Reservation(models.Model):
    # (Leaving this as is for now, but you likely won't need date ranges for selling cars)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('users.User', related_name='reservations', on_delete=models.CASCADE)
    listing = models.ForeignKey(Listing, related_name='reservations', on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    total_price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reservation {self.id}"

class ListingImage(models.Model):
    # UPDATED: Changed 'Bedroom' to 'Interior'/'Engine'
    IMAGE_CATEGORIES = (
        ('gallery', 'Gallery'),
        ('interior', 'Interior'),
        ('engine', 'Engine Bay'),
        ('undercarriage', 'Undercarriage'),
    )

    listing = models.ForeignKey(Listing, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='uploads/listings/gallery')
    category = models.CharField(max_length=20, choices=IMAGE_CATEGORIES, default='gallery')
    label = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f"{self.listing.title} - {self.category}"