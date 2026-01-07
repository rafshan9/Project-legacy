from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.authentication import JWTAuthentication
from reviews.models import Review
from .serializers import ReviewSerializer
from .models import Listing, Reservation, ListingImage
from .serializers import ListingDetailSerializer, ListingSerializer
import json

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_listings(request):
    listings = Listing.objects.all()
    # USE THE CORRECT NAME HERE:
    serializer = ListingSerializer(listings, many=True) 
    return Response({
        'data': serializer.data
    })

# --- ADD THESE 3 LINES HERE ---
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
# ------------------------------
def listing_detail(request, pk):
    listing = Listing.objects.get(pk=pk)
    serializer = ListingDetailSerializer(listing) 
    return Response(serializer.data)

@api_view(['POST'])
@authentication_classes([]) # We will fix security later
@permission_classes([])
def create_reservation(request, pk):
    try:
        listing = Listing.objects.get(pk=pk)
        reservation = Reservation.objects.create(
            user=listing.landlord, # TEMPORARY: Just assign it to the landlord to prevent crash
            listing=listing,
            start_date=request.data['startDate'],
            end_date=request.data['endDate'],
            total_price=request.data['totalPrice']
        )
        
        return Response({'success': True})
    except Exception as e:
        print(e)
        return Response({'success': False}, status=400)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_reservations(request):
    # For now, we fetch ALL reservations to make sure you see them.
    # Later, we can filter by user: Reservation.objects.filter(user=request.user)
    reservations = Reservation.objects.all().order_by('-created_at')
    
    serializer = ReservationSerializer(reservations, many=True)
    return Response(serializer.data)

# ... paste this at the VERY END of the file ...

@api_view(['DELETE'])
@authentication_classes([])
@permission_classes([])
def delete_reservation(request, pk):
    try:
        reservation = Reservation.objects.get(pk=pk)
        reservation.delete()
        return Response({'success': True})
    except Reservation.DoesNotExist:
        return Response({'success': False}, status=404)

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def create_listing(request):
    if not request.user.is_host:
        return Response(
            {'error': 'You must be a verified host to create listings.'}, 
            status=403
        )
    # 1. Create a FRESH dictionary (avoids the Pickle/QueryDict error)
    data = {key: value for key, value in request.data.items()}

    # 2. Fix the 'amenities' field (Convert String -> List)
    if 'amenities' in data and isinstance(data['amenities'], str):
        try:
            data['amenities'] = json.loads(data['amenities'])
        except ValueError:
            data['amenities'] = []
    
    # 3. Pass the CLEAN dict to the serializer
    serializer = ListingDetailSerializer(data=data)

    if serializer.is_valid():
        listing = serializer.save(landlord=request.user)
        
        # 4. Handle Gallery Images (accessed directly from request.FILES)
        # We use request.FILES because 'data' dict above only keeps the last item for duplicate keys
        images = request.FILES.getlist('gallery_images')
        for image in images:
            ListingImage.objects.create(listing=listing, image=image, category='gallery')

        # 5. Handle Bedroom Images (if you have them)
        # Only needed if you are sending "bedroom_image_0", etc.
        for key in request.FILES:
            if key.startswith('bedroom_image_'):
                # Extract the index to find the matching label
                index = key.split('_')[-1]
                label_key = f'bedroom_label_{index}'
                label = request.data.get(label_key, 'Bedroom')
                
                ListingImage.objects.create(
                    listing=listing, 
                    image=request.FILES[key], 
                    category='bedroom', 
                    label=label
                )

        return Response({'success': True, 'data': serializer.data})
    else:
        print('Validation Errors:', serializer.errors)
        return Response({'errors': serializer.errors}, status=400)


@api_view(['DELETE'])
# REMOVE @authentication_classes([]) to allow the default JWT check
@permission_classes([IsAuthenticated]) 
def delete_listing(request, pk):
    try:
        listing = Listing.objects.get(pk=pk)
        
        # Django will now correctly identify 'request.user' from the Bearer token
        if listing.landlord == request.user:
            listing.delete()
            return Response({'success': True}, status=204)
        else:
            return Response({'detail': 'Unauthorized'}, status=403)
    except Listing.DoesNotExist:
        return Response({'success': False}, status=404)


@api_view(['POST']) 
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def update_listing(request, pk):
    # 1. Cleaner fetch with security check built-in
    listing = get_object_or_404(Listing, pk=pk)

    if listing.landlord != request.user:
        return Response({'error': 'You are not the owner of this listing'}, status=403)

    # 2. Update Text Fields
    data = request.data
    listing.title = data.get('title', listing.title)
    listing.description = data.get('description', listing.description)
    listing.price = data.get('price', listing.price)
    listing.category = data.get('category', listing.category)
    listing.address = data.get('address', listing.address)
    listing.city = data.get('city', listing.city)
    listing.country = data.get('country', listing.country)
    listing.make = data.get('make', listing.make)
    listing.model = data.get('model', listing.model)
    listing.year = data.get('year', listing.year)
    listing.odometer = data.get('odometer', listing.odometer)
    listing.transmission = data.get('transmission', listing.transmission)
    listing.fuel_type = data.get('fuel_type', listing.fuel_type)
    
    # 3. Handle Amenities
    if 'amenities' in data:
        try:
             listing.amenities = json.loads(data['amenities'])
        except:
             pass # Ignore bad JSON

    # 4. Update Cover Photo
    if 'image' in request.FILES:
        listing.image = request.FILES['image']
    
    # 5. Add NEW Gallery Images
    images = request.FILES.getlist('gallery_images')
    for image in images:
        ListingImage.objects.create(listing=listing, image=image)

    listing.save()

    serializer = ListingDetailSerializer(listing)
    return Response({'success': True, 'data': serializer.data})
        
@api_view(['POST'])
@permission_classes([IsAuthenticated]) # Lock it down so only logged-in users can review
def create_review(request, pk):
    listing = Listing.objects.get(pk=pk)
    data = request.data

    # 1. Create the new review
    review = Review.objects.create(
        listing=listing,
        user=request.user,
        rating=data['rating'],
        comment=data['comment']
    )

    # 2. Return the data so the frontend can add it to the list immediately
    serializer = ReviewSerializer(review)
    return Response(serializer.data)

@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def delete_listing_image(request, pk, image_id):
    try:
        # Find the specific image
        image = ListingImage.objects.get(pk=image_id)
        
        # Security Check: Ensure the logged-in user owns the listing this image belongs to
        if image.listing.landlord != request.user:
            return JsonResponse({'success': False, 'errors': 'Unauthorized'}, status=403)

        image.delete()
        return JsonResponse({'success': True})

    except ListingImage.DoesNotExist:
        return JsonResponse({'success': False, 'errors': 'Image not found'}, status=404)