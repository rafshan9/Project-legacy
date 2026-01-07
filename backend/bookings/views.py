from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Booking
# FIXED: Import the correct serializer name
from .serializers import BookingSerializer 

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_booking(request):
    # FIXED: Use the correct class name (no spaces)
    serializer = BookingSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)