from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer
from . models import User
from django.contrib.auth import authenticate, login
from django.shortcuts import redirect

class UserDetails(APIView):

    # only authenticated users can access this view
    permission_classes = (IsAuthenticated,)

    # For fetching details of the logged in user
    def get(self, request):

        user = request.user
        serializer_data = UserSerializer(user).data
        # pop password, groups, user_permissions, is_superuser, is_staff, is_active, last_login, date_joined
        serializer_data.pop('password') 
        serializer_data.pop('groups') 
        serializer_data.pop('user_permissions') 
        serializer_data.pop('is_superuser') 
        serializer_data.pop('is_staff') 
        serializer_data.pop('is_active') 
        serializer_data.pop('last_login') 
        serializer_data.pop('date_joined') 
        return Response(serializer_data, status=status.HTTP_200_OK)

class UserRegister(APIView):

    def post(self, request):
        user_serializer = UserSerializer(data=request.data)

        if user_serializer.is_valid():
            user_serializer.save()
            # return redirect('user_login')
            # user_login_instance = UserLogin()
            # return user_login_instance.post(request)
            # return UserLogin().post(request ,  email =  request.data.get('email') , password = request.data.get('password') )    #after successful registration, login the user too
            return Response({'message': 'User Created Successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class UserLogin(TokenObtainPairView):

    def post(self, request, *args, **kwargs):

        # Get the email and password from the request data
        email = request.data.get('email')  
        password = request.data.get('password')  

        # Authenticate the user
        user = authenticate(email=email, password=password)

        if user is not None:

            # Log the user in
            # (i.e. Associate the user with the current request)
            login(request, user)

            # Generate and return the token pair by delegating to parent class's post method
            token = super().post(request,*args, **kwargs)
            # super is the parent class (TokenObtainPairView)
            # so we are calling parent class's post method to generate a token for the user associated with the request

            return Response(token.data, status=status.HTTP_200_OK)
        else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            

class UserLogout(APIView):

    def post(self, request):
        # Get the refresh token from the request
        refresh_token = request.data.get('refresh_token')

        if not refresh_token:
            return Response({'error': 'Refresh token is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Blacklist the refresh token using the built-in SimpleJWT method
            RefreshToken(refresh_token).blacklist()
        except Exception as e:
            return Response({'error': 'Invalid refresh token'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
