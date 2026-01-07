from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.http import JsonResponse

# Import from the LOCAL serializers file
from .serializers import UserSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    data = request.data
    serializer = UserSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def become_host(request):
    user = request.user
    if not user.is_host:
        user.is_host = True
        user.save()
    
    # Update the user with the details from the frontend form
    user.host_full_name = request.data.get('fullName')
    user.host_location = request.data.get('location')
    user.host_id_number = request.data.get('idNumber')
    user.is_host = True  
    
    user.save()
    
    return Response({
        'success': True,
        'is_host': True
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def edit_profile(request):
    user = request.user
    print("DEBUG: Request Data ->", request.data)
    print("DEBUG: User before save ->", user.username)
    data = request.data

    # 1. Update text fields
    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    user.email = data.get('email', user.email)
    user.username = data.get('username', user.username)
    user.phone_number = data.get('phone_number', user.phone_number)
    user.address = data.get('address', user.address)

    # 2. Update avatar if a file was sent
    if 'avatar' in request.FILES:
        user.avatar = request.FILES['avatar']

    user.save()

    return JsonResponse({'success': True})