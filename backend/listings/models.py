import uuid
from django.db import models
from django.conf import settings

class Listing(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # --- NEW CAR FIELDS ---
    make = models.CharField(max_length=100)       # e.g., "BMW"
    model = models.CharField(max_length=100)      # e.g., "E30 325i"
    year = models.IntegerField()                  # e.g., 1988
    
    # Vital Stats for the "Subtitle" line
    odometer = models.IntegerField(help_text="Kilometers driven") 
    transmission = models.CharField(max_length=50, choices=[
        ('manual', 'Manual'), 
        ('automatic', 'Automatic'),
        ('cvt', 'CVT')
    ], default='manual')
    fuel_type = models.CharField(max_length=50, choices=[
        ('petrol', 'Petrol'),
        ('diesel', 'Diesel'),
        ('electric', 'Electric'),
        ('hybrid', 'Hybrid')
    ], default='petrol')
    
    # --- STANDARD FIELDS (Kept from before) ---
    title = models.CharField(max_length=255, blank=True) # blank=True so we can auto-fill it
    description = models.TextField()
    price = models.IntegerField()
    category = models.CharField(max_length=255) # e.g., "Coupe", "Sedan", "Project"
    
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

    # --- LOGIC: Auto-generate Title ---
    def save(self, *args, **kwargs):
        # If title is empty, build it from the car data
        if not self.title:
            self.title = f"{self.year} {self.make} {self.model}"
        super().save(*args, **kwargs)

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