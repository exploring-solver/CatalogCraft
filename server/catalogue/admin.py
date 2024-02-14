from django.contrib import admin
from . models import Catalogue, MasterCatalogue, Categories
# Register your models here.

class CatalogueAdmin(admin.ModelAdmin):
    list_display = ['seller', 'product_name', 'category', 'mrp', 'unit', 'quantity']
    
class MasterCatalogueAdmin(admin.ModelAdmin):
    list_display = ['category']
    
class CategoriesAdmin(admin.ModelAdmin):
    list_display = ['category']

admin.site.register(Catalogue, CatalogueAdmin)
admin.site.register(Categories, CategoriesAdmin)
admin.site.register(MasterCatalogue, MasterCatalogueAdmin)