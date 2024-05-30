from django.db import models
from authentication.models import User
import uuid


class Categories(models.Model):
    category = models.CharField(max_length=25, primary_key=True)
    
    def __str__(self):
        return self.category
    
    class Meta:
        db_table='Categories'
        verbose_name_plural = "Categories"


    

# Create your models here.
class Catalogue(models.Model):
    
    product_name = models.CharField(max_length=50)
    mrp = models.DecimalField(max_digits=10, decimal_places=2)
    gst_percentage = models.CharField(max_length=10)
    
    description = models.TextField(blank=True)
    color = models.CharField(max_length=100, blank=True)     
    brand = models.CharField(max_length=100, blank=True)     
    size = models.CharField(max_length=100, blank=True) 
    
    csin = models.UUIDField( 
         default = uuid.uuid4, 
         editable = False)
    ean = models.CharField(max_length=100)
    
    additional_details = models.TextField(blank=True)
    
    product_image_1 = models.ImageField(blank=True, null=True, upload_to='images/')
    product_image_2 = models.ImageField(blank=True, null=True, upload_to='images/')
    product_image_3 = models.ImageField(blank=True, null=True, upload_to='images/')
    product_image_4 = models.ImageField(blank=True, null=True, upload_to='images/')
    product_image_5 = models.ImageField(blank=True, null=True, upload_to='images/')
    
    standardized = models.BooleanField(default=True)        # standard or non standard
    
    category = models.ForeignKey(Categories, on_delete=models.SET_NULL, null=True, db_column='category')   #example - laptop
    # category = models.CharField(max_length=25)
    
    def __str__(self):
        return self.product_name
    
    class Meta:
        db_table='catalogue'
        verbose_name_plural = "Catalogue"
   
        
class SellerCatalogue(models.Model):
    seller = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, db_column='seller_id')
    catalogue = models.ForeignKey(Catalogue, on_delete=models.SET_NULL, null=True, db_column='catalogue_id')
    
    selling_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.CharField(max_length=10)
    seller_sku = models.CharField(max_length=100)
    
    product_image_6 = models.ImageField(blank=True, null=True, upload_to='images/')
    product_image_7 = models.ImageField(blank=True, null=True, upload_to='images/')
    product_image_8 = models.ImageField(blank=True, null=True, upload_to='images/')
    product_image_9 = models.ImageField(blank=True, null=True, upload_to='images/')
    product_image_10 = models.ImageField(blank=True, null=True, upload_to='images/')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        try:
            return f"{self.seller.name} - {self.catalogue.product_name}"
        except:
            return "-"

    def product_name(self):
        try:
            return f"{self.catalogue.product_name}"
        except:
            return "-"

    def mrp(self):
        try:
            return f"{self.catalogue.mrp}"
        except:
            return "-"

    def ean(self):
        try:
            return f"{self.catalogue.ean}"
        except:
            return "-"

    class Meta:
        db_table = 'seller_catalogue'
        verbose_name_plural = "Seller Catalogue"
        # unique_together = ('seller', 'catalogue')
        
        
        
class CatalogueTemplate(models.Model):
    template_name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    catalogues = models.ManyToManyField(Catalogue, related_name='templates')

    def __str__(self):
        return self.template_name

    class Meta:
        db_table = 'catalogue_template'
        verbose_name_plural = "Catalogue Templates"