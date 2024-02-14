from django.db import models
from authentication.models import User



class Categories(models.Model):
    category = models.CharField(max_length=25, primary_key=True)
    
    def __str__(self):
        return self.category
    
    
    
    
    class Meta:
        db_table='Categories'
        verbose_name_plural = "Categories"


# Create your models here.
class Catalogue(models.Model):
    
    seller = models.ForeignKey(User, max_length=50, on_delete=models.SET_NULL, null=True, db_column='seller')
    
    product_name = models.CharField(max_length=50)
    mrp = models.DecimalField(max_digits=10, decimal_places=2)
    selling_prize = models.DecimalField(max_digits=10, decimal_places=2)
    buying_prize = models.DecimalField(max_digits=10, decimal_places=2)
    hsn_code = models.TextField()
    gst_percentage = models.CharField(max_length=10)
    unit = models.CharField(max_length=10)
    quantity = models.CharField(max_length=10)
    
    product_image_1 = models.ImageField(blank=True, null=True, upload_to='images/')
    product_image_2 = models.ImageField(blank=True, null=True, upload_to='images/')
    product_image_3 = models.ImageField(blank=True, null=True, upload_to='images/')
    product_image_4 = models.ImageField(blank=True, null=True, upload_to='images/')
    product_image_5 = models.ImageField(blank=True, null=True, upload_to='images/')
    
    standardized = models.BooleanField()        # standard or non standard
    
    category = models.ForeignKey(Categories, on_delete=models.SET_NULL, null=True, db_column='category')   #example - laptop
    # category = models.CharField(max_length=25)
    
    mapped_to_master = models.BooleanField()   # if true, then mapped on basis of category
    
    
    
    class Meta:
        db_table='catalogue'
        verbose_name_plural = "Catalogue"
        
        
class MasterCatalogue(models.Model):
    
    category = models.ForeignKey(Categories, on_delete=models.SET_NULL, null=True, db_column='category') 
 
    product_description = models.CharField(max_length=100)
    
    product_image_1 = models.ImageField(blank=True, null=True, upload_to='master-images/')
    product_image_2 = models.ImageField(blank=True, null=True, upload_to='master-images/')
    product_image_3 = models.ImageField(blank=True, null=True, upload_to='master-images/')
    product_image_4 = models.ImageField(blank=True, null=True, upload_to='master-images/')
    product_image_5 = models.ImageField(blank=True, null=True, upload_to='master-images/')
    
    
    class Meta:
        db_table='master_catalogue'
        verbose_name_plural = "Master Catalogue"