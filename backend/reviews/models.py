from django.db import models
from django.conf import settings
from listings.models import Listing

# Create your models here.
class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)

    rating = models.IntegerField()
    comment = models.TextField()

    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.rating} stars - {self.listing.title}"
