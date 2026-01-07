from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import ReviewSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated]) # <--- Fixed: Added parentheses ()
def create_review(request):
    serializer = ReviewSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(user=request.user)
        # Success! Return inside the if block
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    # Failure! If we get here, the data was bad. Return errors.
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)