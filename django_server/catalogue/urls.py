from django.urls import path
from . import views


urlpatterns = [
    path('get/', views.UserCatalogueView.as_view(), name='get_catalouges'),
    path('get-by-id/<int:id>/', views.GetCatalogueById.as_view(), name='get_catalouge_by_id'),
    path('get-sellercatalogue-by-id/<int:id>/', views.GetSellerCatalogueById.as_view(), name='get_seller_catalouge_by_id'),
    path('get-by-category/<str:category>/', views.CataloguesByCategoryView.as_view(), name='get_catalouges_by_category'),
    path('get-all-by-category/', views.GetAllCataloguesByCategory.as_view(), name='get_all_catalouges_by_category'),
    path('create/', views.CreateCatalogueView.as_view(), name='create_catalouge'),
    path('update-sellercatalogue/<int:pk>/', views.UpdateSellerCatalogueView.as_view(), name='update_sellercatalogue'),
    path('delete-sellercatalogue/<int:pk>/', views.DeleteSellerCatalogueView.as_view(), name='delete_sellercatalogue'),
    path('get-all/', views.AllCataloguesView.as_view(), name='get_all_catalouges'),
    path('categories/', views.get_all_categories, name='get_all_categories'),
    path('try/', views.trial, name='try'),
    path('csv/', views.ProductDetails.as_view(), name='csv'),
    path('create-category/', views.CreateCategoryView.as_view(), name='create-category'),
    path('search-similar-images/', views.SearchSimilarImagesView.as_view(), name='search-similar-images'),
    path('template-catalogues/<str:template_name>/', views.TemplateCataloguesView.as_view(), name='template_catalogues'),
    path('templates/', views.AllTemplatesView.as_view(), name='all_templates'),
    path('search-catalogues/', views.SearchCataloguesView.as_view(), name='search_catalogues'),
    path('lookup/<str:ean>/', views.EANLookupView.as_view(), name='ean-lookup'),
    path('upload-catalogue/', views.UploadCatalogue.as_view(), name='upload-catalogue'),
    path('upload-save-catalogue/', views.UploadAndSaveCatalogue.as_view(), name='upload-save-catalogue'),
    path('export/all-catalogues/', views.ExportAllCataloguesView.as_view(), name='export-all-catalogues'),
    path('export/seller-catalogues/', views.ExportSellerCataloguesView.as_view(), name='export-seller-catalogues'),
]

