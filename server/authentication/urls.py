from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('user-details/', views.UserDetails.as_view(), name='user_details'),
    path('register/', views.UserRegister.as_view(), name='user_register'),
    path('login/', views.UserLogin.as_view(), name='user_login'),
    path('logout/', views.UserLogout.as_view(), name='user_logout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),     
]