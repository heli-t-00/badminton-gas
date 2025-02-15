from django.db import models
from django.contrib.auth.models import User


# A game belongs to a user
class Game(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=200)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# A point belongs to a game
class Point(models.Model):
    game = models.ForeignKey("Game", on_delete=models.CASCADE, to_field='id', related_name='points', blank=True, null=True)
    total = models.IntegerField()
    team_a = models.IntegerField()

    def team_b(self): 
        return self.total-self.team_a
    
    def __str__(self):
        return f"A={self.team_a} B={self.team_b()}"


# A shot belongs to a point
class Shot(models.Model):
    point = models.ForeignKey("Point", on_delete=models.CASCADE, to_field='id', related_name='shots', blank=True, null=True)
    a1x = models.FloatField()  # Player 1 in team A x position
    a1y = models.FloatField()  # Player 1 in team A y position
    b1x = models.FloatField()  # Player 1 in team B x position
    b1y = models.FloatField()  # Player 1 in team B y position
    sx = models.FloatField()  # Shuttle x position
    sy = models.FloatField()  # Shuttle y position

    def __str__(self):
        return f"A1({self.a1x},{self.a1y}) B1({self.b1x},{self.b1y}) Sh({self.sx},{self.sy})"
