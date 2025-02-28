# Create your views here.
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views.generic import CreateView

from rest_framework import permissions, status, authentication
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import GameSerializer, GameNameSerializer
from .models import Game
import json


class SignUpView(CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy("login")
    template_name = "registration/signup.html"


# We are creating a new class called SignUpView that extends CreateView, sets the form as UserCreationForm,
# and uses the not-yet-created template signup.html. Note that we use reverse_lazy to redirect users to the login
# page upon successful registration rather than reverse, because for all generic class-based views, the URLs are not
# loaded when the file is imported, so we have to use the lazy form of reverse to load them later when we are sure
# they're available.

class GameApiView(APIView):
    # check if user is authenticated
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    # 1. List all
    def get(self, request, *args, **kwargs):
        """
        List all the games for given requested user
        """
        games = Game.objects  #.filter(user=request.user.id)  # All users can see all games
        serializer = GameNameSerializer(games, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 2. Create
    def post(self, request, *args, **kwargs):
        """
        Create the game with given game data
        """
        serializer = GameSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GameDetailApiView(APIView):
    # check if user is authenticated
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, game_id):  #, user_id):
        '''
        Helper method to get the Game with given game_id, and user_id
        '''
        try:
            return Game.objects.get(id=game_id)  #, user = user_id)
        except Game.DoesNotExist:
            return None

    # 3. Retrieve
    def get(self, request, game_id, *args, **kwargs):
        '''
        Retrieves the game with given game_id
        '''
        game_instance = self.get_object(game_id)  #, request.user.id)  # All users can retrieve any game details
        if not game_instance:
            return Response(
                {"res": "Game with game id does not exist"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = GameSerializer(game_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 4. Update
    def put(self, request, game_id, *args, **kwargs):
        '''
        Updates the game with given game_id if exists
        '''
        game_instance = self.get_object(game_id)  #, request.user.id)
        if not game_instance:
            return Response(
                {"res": "Game with game id does not exist"},
                status=status.HTTP_400_BAD_REQUEST
            )
        # Do not allow other users to update a users game
        if game_instance.user.id != request.user.id:
            return Response(
                {"res": "Game does not belong to you"},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = GameSerializer(instance=game_instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 5. Delete
    def delete(self, request, game_id, *args, **kwargs):
        '''
        Deletes the game with given game_id if exists
        '''
        game_instance = self.get_object(game_id)  #, request.user.id)
        if not game_instance:
            return Response(
                {"res": "Game with game id does not exist"},
                status=status.HTTP_400_BAD_REQUEST
            )
        # Do not allow other users to update a users game
        if game_instance.user.id != request.user.id:
            return Response(
                {"res": "Game does not belong to you"},
                status=status.HTTP_400_BAD_REQUEST
            )
        game_instance.delete()
        return Response(
            {"res": "Game deleted!"},
            status=status.HTTP_200_OK
        )
