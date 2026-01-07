from django.urls import path
from . import views  # <--- Changed from 'api' to 'views' to match your filename

urlpatterns = [
    path('create/', views.create_listing),
    path('reservations/', views.get_reservations),
    path('', views.get_listings),
    path('<uuid:pk>/', views.listing_detail),
    path('<uuid:pk>/reservations/', views.create_reservation),
    path('reservations/<uuid:pk>/', views.delete_reservation),
    path('<uuid:pk>/update/', views.update_listing, name='update_listing'),
    path('<uuid:pk>/delete/', views.delete_listing, name='api_delete_listing'),
    path('<uuid:pk>/reviews/', views.create_review, name='create_review'),
    path('<str:pk>/images/<int:image_id>/delete/', views.delete_listing_image, name='delete_listing_image'),

]