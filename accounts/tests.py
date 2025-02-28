from django.test import TestCase

# Create your tests here.

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Game, Point, Shot

class GameTests(APITestCase):
        def test_create_game(self):
            """
            Ensure we can create a new game.
            """
            url = reverse('')
            data = {'name': 'New game'}
            response = self.client.post(url, data, format='json')
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)
            self.assertEqual(Game.objects.count(), 1)
            self.assertEqual(Game.objects.get().name, 'New game')
