from django.urls import path

from . import views

urlpatterns = [
    path("signup/", views.SignUpView.as_view(), name="signup"),
    # path("games", views.GameListView.as_view())
    # path('games/list', views.GameListView.as_view(), name='game-list'),
    # path('games/details/', views.GameDetailsView.as_view(), name='game-details'),
    # path('games/create/', views.GameCreateView.as_view(), name='game-create'),
    path('', views.GameApiView.as_view(), name="gas"),
    path('<int:game_id>', views.GameDetailApiView.as_view()),
]
