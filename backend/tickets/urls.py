from django.urls import path
from . import views

urlpatterns = [
    path('', views.ticket_list, name='ticket-list'),
    path('<int:pk>/', views.ticket_detail, name='ticket-detail'),
]