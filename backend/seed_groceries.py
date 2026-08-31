import os
import django
import urllib.request
from django.core.files.base import ContentFile

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'haven_backend.settings')
django.setup()

from listings.models import Listing
from users.models import User

# Create a dummy user if none exists
user, created = User.objects.get_or_create(username='grocerystore', defaults={'email': 'store@example.com'})
if created:
    user.set_password('password123')
user.is_staff = True
user.save()

# Sample Grocery Data with Unsplash URLs
groceries = [
    {
        "title": "Organic Bananas",
        "brand": "Nature's Best",
        "weight": "1 kg",
        "dietary_preference": "organic",
        "price": 3,
        "category": "Produce",
        "description": "Fresh, locally sourced organic bananas. Perfect for snacking or baking.",
        "image_url": "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=500&q=80"
    },
    {
        "title": "Whole Milk",
        "brand": "Dairy Pure",
        "weight": "1 Gallon",
        "dietary_preference": "none",
        "price": 4,
        "category": "Dairy",
        "description": "Rich and creamy whole milk from pasture-raised cows.",
        "image_url": "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&q=80"
    },
    {
        "title": "Gluten-Free Oats",
        "brand": "Healthy Harvest",
        "weight": "500g",
        "dietary_preference": "gluten_free",
        "price": 5,
        "category": "Bakery",
        "description": "Hearty gluten-free rolled oats, ideal for a nutritious breakfast.",
        "image_url": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=500&q=80"
    },
    {
        "title": "Vegan Burger Patties",
        "brand": "PlantPower",
        "weight": "400g",
        "dietary_preference": "vegan",
        "price": 8,
        "category": "Meat",
        "description": "Delicious plant-based burger patties that taste just like the real thing.",
        "image_url": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80"
    },
    {
        "title": "Sea Salt Potato Chips",
        "brand": "SnackTime",
        "weight": "200g",
        "dietary_preference": "none",
        "price": 2,
        "category": "Snacks",
        "description": "Crunchy potato chips seasoned with natural sea salt.",
        "image_url": "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&q=80"
    },
    {
        "title": "Organic Honey",
        "brand": "Sweet Bee",
        "weight": "250g",
        "dietary_preference": "organic",
        "price": 10,
        "category": "Produce",
        "description": "Raw, unfiltered organic honey sourced from local beekeepers.",
        "image_url": "https://images.unsplash.com/photo-1557308536-ee471ef2c390?w=500&q=80"
    }
]

print("Clearing old listings...")
Listing.objects.all().delete()

print("Seeding new grocery listings with real images...")
for item in groceries:
    try:
        req = urllib.request.Request(item['image_url'], headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(req)
        img_content = response.read()
        img = ContentFile(img_content, name=f"{item['title'].replace(' ', '_')}.jpg")
    except Exception as e:
        print(f"Failed to fetch image for {item['title']}: {e}")
        # fallback to empty transparent image
        dummy_image = (
            b'\x47\x49\x46\x38\x39\x61\x01\x00\x01\x00\x80\x00\x00'
            b'\xff\xff\xff\x00\x00\x00\x21\xf9\x04\x01\x00\x00\x00'
            b'\x00\x2c\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02'
            b'\x44\x01\x00\x3b'
        )
        img = ContentFile(dummy_image, name=f"{item['title'].replace(' ', '_')}.gif")

    Listing.objects.create(
        landlord=user,
        title=item['title'],
        brand=item['brand'],
        weight=item['weight'],
        dietary_preference=item['dietary_preference'],
        price=item['price'],
        category=item['category'],
        description=item['description'],
        address='123 Main St',
        city='Grocery City',
        country='Foodland',
        image=img
    )

print(f"Successfully seeded {len(groceries)} fake grocery listings!")
