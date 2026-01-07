from django.db import models
from django.conf import settings
from listings.models import Listing

# Create your models here.
class Booking(models.Model):
    # The guest
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    # The apartment
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    # The schedule 
    start_date = models.DateField()
    end_date = models.DateField()
    # The money
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    # Status (Default is pending)
    status = models.CharField(max_length=20, default='pending')
    # Timestamp
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} booked {self.listing}"