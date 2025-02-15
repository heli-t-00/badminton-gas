from rest_framework import serializers
from .models import Game, Point, Shot
from drf_writable_nested import WritableNestedModelSerializer


# A shot (positions of players and shuttle)
class ShotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shot
        fields = '__all__'


# A point with all the shots for that point
class PointSerializer(WritableNestedModelSerializer, serializers.ModelSerializer):
    # A point has many shots
    shots = ShotSerializer(many=True, required=False)

    class Meta:
        model = Point
        fields = '__all__'


# A game with all the details included, points and shots also
class GameSerializer(WritableNestedModelSerializer, serializers.ModelSerializer):
    # A game has many points
    points = PointSerializer(many=True, required=False)

    class Meta:
        model = Game
        fields = '__all__'


# Just the games without details so we can display a list of names
class GameNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'
