from django.contrib import admin
from . models import Catalogue, Categories, SellerCatalogue, CatalogueTemplate
from import_export.admin import ExportActionMixin
# Register your models here.

class CatalogueAdmin(ExportActionMixin, admin.ModelAdmin):
    list_display = ['product_name', 'description', 'csin', 'category', 'mrp']
    list_filter = ['category']
    search_fields = ['product_name']
    

class SellerCatalogueAdmin(ExportActionMixin, admin.ModelAdmin):
    list_display = ['seller', 'catalogue', 'product_name', 'mrp', 'ean', 'selling_price']
    # list_filter = ['seller', 'catalogue']
    
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(seller=request.user)
    
    def get_list_filter(self, request):
        if request.user.is_superuser:
            return ['seller', 'catalogue']
        return ['catalogue']
    
    
class CategoriesAdmin(ExportActionMixin, admin.ModelAdmin):
    list_display = ['category']
    
    
class CatalogueTemplateAdmin(ExportActionMixin, admin.ModelAdmin):
    list_display = ['template_name', 'description']

admin.site.register(Catalogue, CatalogueAdmin)
admin.site.register(Categories, CategoriesAdmin)
admin.site.register(SellerCatalogue, SellerCatalogueAdmin)
admin.site.register(CatalogueTemplate, CatalogueTemplateAdmin)