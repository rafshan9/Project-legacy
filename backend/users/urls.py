from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView


urlpatterns = [
    path('register/', views.register_user),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'), 
    path('me/', views.get_current_user),
    path('become-host/', views.become_host, name='become_host')
]