from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static 
from users import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/listings/', include('listings.urls')),
    path('api/auth/', include('dj_rest_auth.urls')),           
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/users/', include('users.urls')),
    path('api/bookings/', include('bookings.urls')),
    path('api/reviews/', include('reviews.urls')),
    path('api/auth/me/', views.get_current_user, name='get_current_user'),
    path('api/auth/edit/', views.edit_profile, name='edit_profile'),
] 
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 
