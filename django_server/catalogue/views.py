from django.shortcuts import render
from . models import Catalogue, Categories, SellerCatalogue, CatalogueTemplate
from . serializers import CatalogueSerializer, CategorySerializer, SellerCatalogueSerializer, SellerCatalogueDetailSerializer, CatalogueTemplateSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import Categories
# Create your views here.



from random import choices
from string import ascii_letters, digits

def generate_sku():
    return ''.join(choices('123456789', k=3))





# to get catalogue of logged in user
# class UserCatalogueView(APIView):
#     permission_classes = (IsAuthenticated, )

#     def get(self, request):
#         user = request.user
#         seller_catalogues = SellerCatalogue.objects.filter(seller=user)
#         catalogues = [sc.catalogue for sc in seller_catalogues]
#         serializer = CatalogueSerializer(catalogues, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
class UserCatalogueView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        seller_catalogues = SellerCatalogue.objects.filter(seller=user)
        serializer = SellerCatalogueDetailSerializer(seller_catalogues, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class CreateCatalogueView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        seller_catalogue_data = {
            'selling_price': request.data.get('selling_price'),
            'quantity': request.data.get('quantity'),
            'seller_sku': request.data.get('seller_sku'),
            'product_image_6': request.FILES.get('product_image_6', None),
            'product_image_7': request.FILES.get('product_image_7', None),
            'product_image_8': request.FILES.get('product_image_8', None),
            'product_image_9': request.FILES.get('product_image_9', None),
            'product_image_10': request.FILES.get('product_image_10', None),
        }

        # Check if a catalogue with the provided ean already exists
        existing_catalogue = Catalogue.objects.filter(ean=request.data.get('ean')).first()
        if existing_catalogue:
            # If a catalogue with the ean exists, link the seller with the existing catalogue
            seller_catalogue_data['catalogue'] = existing_catalogue.id
        else:
            # If a catalogue with the ean does not exist, create a new catalogue
            catalogue = Catalogue.objects.create(
                product_name=request.data.get('product_name'),
                # additional_details=request.data.get('additional_details'),
                description=request.data.get('description'),
                mrp=request.data.get('mrp'),
                ean=request.data.get('ean'),
                gst_percentage=request.data.get('gst_percentage'),
                product_image_1=request.FILES.get('product_image_1', None),
                product_image_2=request.FILES.get('product_image_2', None),
                product_image_3=request.FILES.get('product_image_3', None),
                product_image_4=request.FILES.get('product_image_4', None),
                product_image_5=request.FILES.get('product_image_5', None),
                # standardized=request.data.get('standardized', False),
                category=Categories.objects.get(category=request.data.get('category'))
            )
            seller_catalogue_data['catalogue'] = catalogue.id

        user = request.user  # Get logged-in user
        seller_catalogue_data['seller'] = user.id

        # Save SellerCatalogue object
        seller_catalogue_serializer = SellerCatalogueSerializer(data=seller_catalogue_data)
        
        if seller_catalogue_serializer.is_valid():
            seller_catalogue_serializer.save()
            return Response(seller_catalogue_serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Rollback catalogue creation if seller catalogue is invalid
            if not existing_catalogue:
                catalogue.delete()
            return Response(seller_catalogue_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
# to get all catalogues even without logging in    
class AllCataloguesView(APIView):

    def get(self, request):
        catalogues = Catalogue.objects.all()
        serializer = CatalogueSerializer(catalogues, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
'''
{
  "categories": [
    "household",
    "laptop",
    ""
  ]
}
'''
def get_all_categories(request):
    categories = Categories.objects.all().values_list('category', flat=True)
    return JsonResponse({'categories': list(categories)})


class CataloguesByCategoryView(APIView):

    def get(self, request, category):
        try:
            category_instance = Categories.objects.get(category=category)
            catalogues = Catalogue.objects.filter(category=category_instance)
            serializer = CatalogueSerializer(catalogues, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Categories.DoesNotExist:
            return Response({"detail": "Category not found."}, status=status.HTTP_404_NOT_FOUND)
    
    
    
    
'''
{
  "household": [
    {
      "id": 1,
      "product_name": "sabun",
      "mrp": "25.00",
      "selling_price": "20.00",
      "buying_prize": "20.00",
      "gst_percentage": "18",
      "unit": "2",
      "quantity": "2",
      "product_image_1": "/media/master-images/WhatsApp_Image_2024-02-07_at_11.33.56_PM.jpeg",
      "product_image_2": "/media/master-images/WhatsApp_Image_2024-02-07_at_11.33.56_PM_y4GuIZi.jpeg",
      "product_image_3": null,
      "product_image_4": null,
      "product_image_5": null,
      "standardized": true,
      "mapped_to_master": true,
      "seller": 3,
      "category": "household"
    }
  ],
  "laptop": [
    {
      "id": 2,
      "product_name": "hp laptop",
      "mrp": "25.00",
      "selling_price": "20.00",
      "buying_prize": "20.00",
      "gst_percentage": "18",
      "unit": "2",
      "quantity": "2",
      "product_image_1": "/media/master-images/DSA.png",
      "product_image_2": null,
      "product_image_3": null,
      "product_image_4": null,
      "product_image_5": null,
      "standardized": true,
      "mapped_to_master": true,
      "seller": 3,
      "category": "laptop"
    },
    {
      "id": 3,
      "product_name": "HP ka laptop",
      "mrp": "20.00",
      "selling_price": "20.00",
      "buying_prize": "20.00",
      "gst_percentage": "18",
      "unit": "1",
      "quantity": "11",
      "product_image_1": "/media/master-images/DSA.png",
      "product_image_2": null,
      "product_image_3": null,
      "product_image_4": null,
      "product_image_5": null,
      "standardized": true,
      "mapped_to_master": true,
      "seller": null,
      "category": "laptop"
    }
  ],
  "": []
}
'''      
class GetAllCataloguesByCategory(APIView):
    
    def get(self, request):
        all_categories = Categories.objects.all()
        result_data = {}

        for category in all_categories:
            category_name = category.category
            catalogues = Catalogue.objects.filter(category=category)
            
            # Serialize the catalogues for the current category
            catalogue_serializer = CatalogueSerializer(catalogues, many=True)
            result_data[category_name] = catalogue_serializer.data

        return Response(result_data, status=status.HTTP_200_OK)
    
    
    
    
    
    
def trial(request):
    return render(request, 'catalogue.html')



class GetCatalogueById(APIView):
    
    def get(self, request, id):
        try:
            catalogue = Catalogue.objects.get(id=id)
            serializer = CatalogueSerializer(catalogue)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Catalogue.DoesNotExist:
            return Response({"detail": "Catalogue not found."}, status=status.HTTP_404_NOT_FOUND)
        
class GetSellerCatalogueById(APIView):
    
    def get(self, request, id):
        try:
            seller_catalogue = SellerCatalogue.objects.get(id=id)
            catalogue = seller_catalogue.catalogue  # Get the related Catalogue instance

            # Serialize the seller catalogue data
            seller_catalogue_data = SellerCatalogueSerializer(seller_catalogue).data

            # Serialize the related catalogue data
            catalogue_data = CatalogueSerializer(catalogue).data

            # Combine the data
            combined_data = {**seller_catalogue_data, **catalogue_data}
            combined_data['catalogue_id'] = catalogue.id  # Keep the original catalogue ID in the response

            return Response(combined_data, status=status.HTTP_200_OK)
        except :
            return Response({"detail": "Seller Catalogue not found."}, status=status.HTTP_404_NOT_FOUND)
        
        
import pandas as pd
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
import os

class ProductDetails(APIView):
    parser_classes = [JSONParser]

    def post(self, request):
        """
        API to get product details based on name from request data

        Args:
            request: A request object

        Returns:
            JsonResponse: A JSON response containing product details or an error message
        """

        product_name = request.data.get('name')
        if not product_name:
            return JsonResponse({'error': 'Missing product name in request data'}, status=400)

        try:
            # Replace 'path/to/your/file.xlsx' with the actual path to your Excel file
            if os.name == 'nt':  # Check if the operating system is Windows
                df = pd.read_excel('catalogue\ondc.xlsx')
            else:
                df = pd.read_excel('catalogue/ondc.xlsx')
                
            product_data = df[df['name'] == product_name].to_dict(orient='records')

            if product_data:
                return JsonResponse(product_data[0])
            else:
                return JsonResponse({'message': 'Product not found'}, status=404)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)


class CreateCategoryView(APIView):
    
    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
import cv2
import numpy as np

def get_most_matching_catalogues(image_file):
    # Read the uploaded image
    uploaded_image = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_COLOR)
    
    # Initialize ORB detector
    orb = cv2.ORB_create()

    # Find keypoints and descriptors in the uploaded image
    kp1, des1 = orb.detectAndCompute(uploaded_image, None)

    # Initialize a list to store matching catalogues with their scores
    matching_catalogues = []

    # Iterate through all catalogues to find matching images
    for catalogue in Catalogue.objects.all():
        total_score = 0
        num_images = 0
        scores = []
        
        # List of product image paths
        product_images = [
            catalogue.product_image_1,
            catalogue.product_image_2,
            catalogue.product_image_3,
            catalogue.product_image_4,
            catalogue.product_image_5
        ]

        for product_image in product_images:
            try:
                if product_image:  # Check if product image exists
                    # Read the product image from the catalogue
                    product_image_path = product_image.path
                    with open(product_image_path, 'rb') as product_image_file:
                        product_image_data = cv2.imdecode(np.frombuffer(product_image_file.read(), np.uint8), cv2.IMREAD_COLOR)

                    # Convert to grayscale
                    product_image_gray = cv2.cvtColor(product_image_data, cv2.COLOR_BGR2GRAY)

                    # Find keypoints and descriptors in the product image
                    kp2, des2 = orb.detectAndCompute(product_image_gray, None)

                    # Initialize a BFMatcher object
                    bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)

                    # Match descriptors
                    matches = bf.match(des1, des2)

                    # Sort matches based on their distances
                    matches = sorted(matches, key=lambda x: x.distance)

                    # Keep the top few matches (e.g., 10)
                    top_matches = matches[:10]

                    # If there are matches, calculate the score
                    if top_matches:
                        score = sum([match.distance for match in top_matches]) / len(top_matches)
                        scores.append(score)
                        num_images += 1

            except:
                # If product image file doesn't exist or any error occurs, skip this image
                continue

        if scores:
            average_score = sum(scores) / num_images
            matching_catalogues.append((catalogue, average_score))

    # Sort the catalogues by their average score in ascending order (lower score is better)
    matching_catalogues = sorted(matching_catalogues, key=lambda x: x[1])

    # Return the top 5 matching catalogues based on the average score
    top_5_matching_catalogues = [catalogue for catalogue, score in matching_catalogues[:5]]
    
    return top_5_matching_catalogues


from rest_framework.parsers import MultiPartParser
class SearchSimilarImagesView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        # Read the uploaded image
        image_file = request.FILES.get('image')
        if not image_file:
            return Response({"error": "No image file provided."}, status=status.HTTP_400_BAD_REQUEST)

        # Get the most matching catalogues
        matching_catalogues = get_most_matching_catalogues(image_file)

        # Serialize the matching catalogues
        serializer = CatalogueSerializer(matching_catalogues, many=True)

        # Add generated seller_sku to each catalogue in the serialized data
        def generate_sku(product_name):
            from random import choices
            from string import ascii_letters, digits

            # Generate a random 6-character string
            def generate_random_string():
                return ''.join(choices('123456789', k=3))

            # Get initials of the product name
            initials = ''.join(word[0] for word in product_name.split()[:3])
            # Generate random string
            random_string = generate_random_string()
            # Combine initials and random string
            return f'{initials}_{random_string}'

        response_data = serializer.data
        for catalogue in response_data:
            catalogue['seller_sku'] = generate_sku(catalogue['product_name'])

        # Return the details of matching catalogues
        return Response(response_data, status=status.HTTP_200_OK)
    
    
class TemplateCataloguesView(APIView):
    def get(self, request, template_name):
        try:
            template = CatalogueTemplate.objects.get(template_name=template_name)
            catalogues = template.catalogues.all()
            serializer = CatalogueSerializer(catalogues, many=True)

            # Function to generate seller_sku
            def generate_sku(product_name):
                from random import choices
                from string import ascii_letters, digits

                # Generate a random 6-character string
                def generate_random_string():
                    return ''.join(choices('123456789', k=3))

                # Get initials of the product name
                initials = ''.join(word[0] for word in product_name.split()[:3])
                # Generate random string
                random_string = generate_random_string()
                # Combine initials and random string
                return f'{initials}_{random_string}'

            # Add generated seller_sku to each catalogue in the serialized data
            response_data = serializer.data
            for catalogue in response_data:
                catalogue['seller_sku'] = generate_sku(catalogue['product_name'])

            return Response(response_data, status=status.HTTP_200_OK)
        except CatalogueTemplate.DoesNotExist:
            return Response({"error": "Template not found"}, status=status.HTTP_404_NOT_FOUND)
    
    
    
        
from django.db.models import Q  # Import Q for complex queries          
        
class SearchCataloguesView(APIView):
    def get(self, request):
        query = request.query_params.get('query', None)
        
        if not query:
            return Response({"error": "A search query is required."}, status=status.HTTP_400_BAD_REQUEST)

        catalogues = Catalogue.objects.filter(
            Q(product_name__icontains=query) |
            Q(description__icontains=query) |
            Q(csin__icontains=query) |
            Q(ean__icontains=query)
        )

        serializer = CatalogueSerializer(catalogues, many=True)

        # Function to generate seller_sku
        def generate_sku(product_name):
            from random import choices
            from string import ascii_letters, digits

            # Generate a random 6-character string
            def generate_random_string():
                return ''.join(choices('123456789', k=3))

            # Get initials of the product name
            initials = ''.join(word[0] for word in product_name.split()[:3])
            # Generate random string
            random_string = generate_random_string()
            # Combine initials and random string
            return f'{initials}_{random_string}'

        # Add generated seller_sku to each catalogue in the serialized data
        response_data = serializer.data
        for catalogue in response_data:
            catalogue['seller_sku'] = generate_sku(catalogue['product_name'])

        return Response(response_data, status=status.HTTP_200_OK)


class AllTemplatesView(APIView):
    def get(self, request):
        templates = CatalogueTemplate.objects.values_list('template_name', flat=True)
        return Response(list(templates), status=status.HTTP_200_OK)
    

import os
import pandas as pd
import zipfile
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings

# class UploadCatalogue(APIView):

#     def post(self, request):
#         excel_file = request.FILES['excel_file']
#         zip_file = request.FILES['zip_file']

#         # Save the uploaded files temporarily
#         excel_path = default_storage.save(f'temp/{excel_file.name}', ContentFile(excel_file.read()))
#         zip_path = default_storage.save(f'temp/{zip_file.name}', ContentFile(zip_file.read()))

#         # Unzip the images
#         with zipfile.ZipFile(default_storage.path(zip_path), 'r') as zip_ref:
#             zip_ref.extractall(settings.MEDIA_ROOT + '/images/temp/')

#         # Read the Excel file
#         excel_data = pd.read_excel(default_storage.path(excel_path))

#         catalogues = []

#         # Iterate over the rows in the Excel file
#         for index, row in excel_data.iterrows():
#             product_name = row.get('name', '')
#             description = row.get('description', '')
#             mrp = row.get('price', 0)
#             gst_percentage = row.get('gst_percentage', '')
#             ean = row.get('ean', '')
#             standardized = True if row.get('standardized', True) else False
#             category_name = row.get('category', '')

#             # Find or create category
#             category, created = Categories.objects.get_or_create(category=category_name)

#             # Handle image fields
#             product_images = []
#             for i in range(1, 6):
#                 image_filename = row.get(f'image_{i}', None)
#                 if image_filename:
#                     product_images.append(f'images/temp/{image_filename}')
#                 else:
#                     product_images.append(None)

#             catalogue_data = {
#                 'product_name': product_name,
#                 'mrp': mrp,
#                 'gst_percentage': gst_percentage,
#                 'ean': ean,
#                 'product_image_1': product_images[0],
#                 'product_image_2': product_images[1],
#                 'product_image_3': product_images[2],
#                 'product_image_4': product_images[3],
#                 'product_image_5': product_images[4],
#                 'standardized': standardized,
#                 'category': category.category
#             }

#             # Create catalogue instance
#             catalogue = Catalogue.objects.create(
#                 product_name=product_name,
#                 mrp=mrp,
#                 gst_percentage=gst_percentage,
#                 ean=ean,
#                 product_image_1=product_images[0],
#                 product_image_2=product_images[1],
#                 product_image_3=product_images[2],
#                 product_image_4=product_images[3],
#                 product_image_5=product_images[4],
#                 standardized=standardized,
#                 category=category
#             )

#             # Append serialized data to the response list
#             serialized_catalogue = CatalogueSerializer(catalogue).data
#             catalogues.append(serialized_catalogue)

#         # Clean up temporary files
#         os.remove(default_storage.path(excel_path))
#         os.remove(default_storage.path(zip_path))

#         return Response(catalogues, status=status.HTTP_201_CREATED)

class UploadCatalogue(APIView):

    def post(self, request):
        excel_file = request.FILES['excel_file']
        zip_file = request.FILES['zip_file']

        # Save the uploaded files temporarily
        excel_path = default_storage.save(f'temp/{excel_file.name}', ContentFile(excel_file.read()))
        zip_path = default_storage.save(f'temp/{zip_file.name}', ContentFile(zip_file.read()))

        # Unzip the images
        with zipfile.ZipFile(default_storage.path(zip_path), 'r') as zip_ref:
            zip_ref.extractall(settings.MEDIA_ROOT + '/images/temp/')

        # Read the Excel file
        excel_data = pd.read_excel(default_storage.path(excel_path))

        catalogues = []

        # Function to generate seller_sku
        def generate_sku(product_name):
            from random import choices
            from string import ascii_letters, digits

            # Generate a random 6-character string
            def generate_random_string():
                return ''.join(choices('123456789', k=3))

            # Get initials of the product name
            initials = ''.join(word[0] for word in product_name.split()[:3])
            # Generate random string
            random_string = generate_random_string()
            # Combine initials and random string
            return f'{initials}_{random_string}'

        # Iterate over the rows in the Excel file
        for index, row in excel_data.iterrows():
            product_name = row.get('name', '')
            description = row.get('description', '')
            brand = row.get('brand', '')
            color = row.get('color', '')
            size = row.get('size', '')
            mrp = row.get('price', 0)
            gst_percentage = row.get('gst_percentage', '')
            ean = row.get('ean', '')
            standardized = True if row.get('standardized', True) else False
            category_name = row.get('category', '')

            # Find or create category (if needed)
            category, created = Categories.objects.get_or_create(category=category_name)

            # Handle image field
            image_filename = row.get('product_image_1', None)
            product_image_1 = f'/media/images/temp/{zip_file.name[:-4]}/{image_filename}' if image_filename else None

            # Generate seller_sku
            seller_sku = generate_sku(product_name)

            catalogue_data = {
                'product_name': product_name,
                'description': description,
                'brand': brand,
                'color': color,
                'size': size,
                'mrp': mrp,
                'gst_percentage': gst_percentage,
                'ean': ean,
                'product_image_1': product_image_1,
                'product_image_2': None,
                'product_image_3': None,
                'product_image_4': None,
                'product_image_5': None,
                'standardized': standardized,
                'category': category.category,
                'seller_sku': seller_sku  # Add the generated seller_sku
            }

            catalogues.append(catalogue_data)

        # Clean up temporary files (only Excel and ZIP, not images)
        os.remove(default_storage.path(excel_path))
        os.remove(default_storage.path(zip_path))

        return Response(catalogues, status=status.HTTP_200_OK)

class UploadAndSaveCatalogue(APIView):
    def post(self, request):
        excel_file = request.FILES.get('excel_file')
        zip_file = request.FILES.get('zip_file')

        if not excel_file or not zip_file:
            return Response({"error": "Both Excel file and ZIP file are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Save the uploaded files temporarily
        excel_path = default_storage.save(f'temp/{excel_file.name}', ContentFile(excel_file.read()))
        zip_path = default_storage.save(f'temp/{zip_file.name}', ContentFile(zip_file.read()))

        # Unzip the images
        with zipfile.ZipFile(default_storage.path(zip_path), 'r') as zip_ref:
            zip_ref.extractall(settings.MEDIA_ROOT + '/images/temp/')

        # Read the Excel file
        excel_data = pd.read_excel(default_storage.path(excel_path))

        for index, row in excel_data.iterrows():
            product_name = row.get('name', '')
            description = row.get('description', '')
            brand = row.get('brand', '')
            color = row.get('color', '')
            size = row.get('size', '')
            mrp = row.get('price', 0)
            gst_percentage = row.get('gst_percentage', '')
            ean = row.get('ean', '')
            standardized = row.get('standardized', True)
            category_name = row.get('category', '')
            selling_price = row.get('selling_price', 0)
            quantity = row.get('Qty', '')
            seller_sku = row.get('seller_sku', '')
            
            # Generate seller_sku if not provided
            if not seller_sku:
                # Get initials of the product name
                initials = ''.join(word[0] for word in product_name.split()[:3])
                # Generate random string
                random_string = generate_sku()
                # Combine initials and random string
                seller_sku = f'{initials}-{random_string}'

            # Find or create category (if needed)
            category, created = Categories.objects.get_or_create(category=category_name)

            # Handle image fields
            image_paths = []
            for i in range(1, 6):
                image_filename = row.get(f'product_image_{i}', None)
                if image_filename:
                    image_paths.append(f'/images/temp/{zip_file.name[:-4]}/{image_filename}')
                    
            # Check if a catalogue with the provided ean already exists
            existing_catalogue = Catalogue.objects.filter(ean=ean).first()
            if existing_catalogue:
                catalogue = existing_catalogue
            else:
                # Create Catalogue object
                catalogue = Catalogue.objects.create(
                    product_name=product_name,
                    description=description,
                    brand=brand,
                    color=color,
                    size=size,
                    mrp=mrp,
                    gst_percentage=gst_percentage,
                    ean=ean,
                    standardized=standardized,
                    category=category,
                    product_image_1=image_paths[0] if image_paths else None,
                    product_image_2=image_paths[1] if len(image_paths) > 1 else None,
                    product_image_3=image_paths[2] if len(image_paths) > 2 else None,
                    product_image_4=image_paths[3] if len(image_paths) > 3 else None,
                    product_image_5=image_paths[4] if len(image_paths) > 4 else None,
                )

            # Create SellerCatalogue object
            seller = request.user if request.user else None
            SellerCatalogue.objects.create(
                seller=seller,
                catalogue=catalogue,
                selling_price=selling_price,
                quantity=quantity,
                seller_sku=seller_sku
            )

        # Clean up temporary files (only Excel and ZIP, not images)
        os.remove(default_storage.path(excel_path))
        os.remove(default_storage.path(zip_path))

        return Response({"message": "Catalogue data saved successfully."}, status=status.HTTP_200_OK)
    
    
    
from rest_framework.generics import UpdateAPIView

class UpdateSellerCatalogueView(UpdateAPIView):
    queryset = SellerCatalogue.objects.all()  # Specify the queryset to retrieve the SellerCatalogue object
    serializer_class = SellerCatalogueSerializer  # Specify the serializer class for serialization and deserialization
    permission_classes = [IsAuthenticated]  # Add any permission classes as needed

    def put(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)  # Determine whether to perform a partial update
        instance = self.get_object()  # Retrieve the SellerCatalogue instance

        # Serialize the data from the request
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)


from rest_framework.generics import DestroyAPIView

class DeleteSellerCatalogueView(DestroyAPIView):
    queryset = SellerCatalogue.objects.all()  # Specify the queryset to retrieve the SellerCatalogue object
    permission_classes = [IsAuthenticated]  # Add any permission classes as needed
    
    
    
import requests

class EANLookupView(APIView):
    def get(self, request, ean):
        api_url = f"https://api.barcodespider.com/v1/lookup?token=3cb93207e05597b307ba&upc={ean}"
        response = requests.get(api_url)

        if response.status_code != 200:
            return Response({"error": "Product with provided ean not found."}, status=status.HTTP_400_BAD_REQUEST)

        data = response.json()
        item_response = data.get('item_response', {})
        item_attributes = data.get('item_attributes', {})

        if item_response.get('code') != 200:
            return Response({"error": item_response.get('message', 'Error retrieving data')}, status=status.HTTP_400_BAD_REQUEST)
        
        # Get initials of the product name
        initials = ''.join(word[0] for word in item_attributes.get('title', '').split())
        # Generate random string
        random_string = generate_sku()
        # Combine initials and random string
        seller_sku = f'{initials}-{random_string}'

        # Format the response into a proper catalogue format
        formatted_response = {
            'product_name': item_attributes.get('title', ''),
            'mrp': item_attributes.get('highest_price', '0.00'),
            'gst_percentage': '',
            'ean': item_attributes.get('ean', ''),
            'description': item_attributes.get('description', ''),
            'color': item_attributes.get('color', ''),
            'brand': item_attributes.get('brand', ''),
            'size': item_attributes.get('size', ''),
            'product_image_1': item_attributes.get('image', ''),
            'product_image_2': None,
            'product_image_3': None,
            'product_image_4': None,
            'product_image_5': None,
            'standardized': True,
            'category': item_attributes.get('category', ''),
            'seller_sku': seller_sku
        }

        return Response(formatted_response, status=status.HTTP_200_OK)
    


import csv
import pandas as pd
from django.http import HttpResponse

class ExportAllCataloguesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        catalogues = Catalogue.objects.all()

        # Create a HttpResponse object with the appropriate CSV header.
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="all_catalogues.csv"'

        writer = csv.writer(response)
        writer.writerow([
            'Product Name', 'MRP', 'GST Percentage', 'Description', 
            'CSIN', 'EAN', 'Standardized', 'Category', 
            'Product Image 1', 'Product Image 2', 'Product Image 3', 
            'Product Image 4', 'Product Image 5'
        ])

        for catalogue in catalogues:
            writer.writerow([
                catalogue.product_name, catalogue.mrp, catalogue.gst_percentage,
                catalogue.description, catalogue.csin, catalogue.ean, 
                catalogue.standardized, catalogue.category.category if catalogue.category else '',
                catalogue.product_image_1.url if catalogue.product_image_1 else '',
                catalogue.product_image_2.url if catalogue.product_image_2 else '',
                catalogue.product_image_3.url if catalogue.product_image_3 else '',
                catalogue.product_image_4.url if catalogue.product_image_4 else '',
                catalogue.product_image_5.url if catalogue.product_image_5 else ''
            ])

        return response
    
    
    
class ExportSellerCataloguesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        seller_catalogues = SellerCatalogue.objects.filter(seller=request.user)

        # Create a HttpResponse object with the appropriate CSV header.
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="seller_catalogues.csv"'

        writer = csv.writer(response)
        writer.writerow([
            'Product Name', 'MRP', 'GST Percentage', 'Description', 
            'CSIN', 'EAN', 'Standardized', 'Category', 
            'Selling Price', 'Quantity', 'Seller SKU', 
            'Product Image 6', 'Product Image 7', 'Product Image 8', 
            'Product Image 9', 'Product Image 10'
        ])

        for sc in seller_catalogues:
            catalogue = sc.catalogue
            writer.writerow([
                catalogue.product_name, catalogue.mrp, catalogue.gst_percentage,
                catalogue.description, catalogue.csin, catalogue.ean, 
                catalogue.standardized, catalogue.category.category if catalogue.category else '',
                sc.selling_price, sc.quantity, sc.seller_sku,
                sc.product_image_6.url if sc.product_image_6 else '',
                sc.product_image_7.url if sc.product_image_7 else '',
                sc.product_image_8.url if sc.product_image_8 else '',
                sc.product_image_9.url if sc.product_image_9 else '',
                sc.product_image_10.url if sc.product_image_10 else ''
            ])

        return response