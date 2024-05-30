from rest_framework import serializers
from . models import Catalogue, Categories, SellerCatalogue, CatalogueTemplate

class CatalogueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Catalogue
        fields = '__all__'
           


class SellerCatalogueSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellerCatalogue
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = '__all__'

class CatalogueTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogueTemplate
        fields = '__all__'

class SellerCatalogueDetailSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='catalogue.product_name')
    description = serializers.CharField(source='catalogue.description')
    # additional_details = serializers.CharField(source='catalogue.additional_details')
    brand = serializers.CharField(source='catalogue.brand')
    color = serializers.CharField(source='catalogue.color')
    size = serializers.CharField(source='catalogue.size')
    mrp = serializers.DecimalField(source='catalogue.mrp', max_digits=10, decimal_places=2)
    gst_percentage = serializers.CharField(source='catalogue.gst_percentage')
    csin = serializers.CharField(source='catalogue.csin')
    ean = serializers.CharField(source='catalogue.ean')
    product_image_1 = serializers.ImageField(source='catalogue.product_image_1')
    product_image_2 = serializers.ImageField(source='catalogue.product_image_2')
    product_image_3 = serializers.ImageField(source='catalogue.product_image_3')
    product_image_4 = serializers.ImageField(source='catalogue.product_image_4')
    product_image_5 = serializers.ImageField(source='catalogue.product_image_5')
    standardized = serializers.BooleanField(source='catalogue.standardized')
    category = serializers.CharField(source='catalogue.category.category')

    class Meta:
        model = SellerCatalogue
        fields = [
            'id', 'product_name', 'description', 'brand', 'color', 'size',
            'mrp', 'gst_percentage', 'csin', 'ean', 
            'product_image_1', 'product_image_2', 'product_image_3', 
            'product_image_4', 'product_image_5', 'standardized', 'category',
            'product_image_6', 'product_image_7', 'product_image_8',
            'product_image_9', 'product_image_10'
        ]