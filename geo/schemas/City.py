import graphene

from graphene_django import DjangoObjectType
from graphene import relay, ObjectType
from ..models.City import City
from ..forms.City import CityForm
from graphene_django.forms.mutation import DjangoFormMutation
from graphene_django.forms.mutation import DjangoModelFormMutation
from pollutionstat._utilsGQL import CustomDeleteMutation
from graphene_django.filter import DjangoFilterConnectionField

class CityType(DjangoObjectType):
    class Meta:
        model = City
        fields = "__all__"
        filter_fields = [
            "id","name","lat","lng","male_percentage","female_percentage"
        ]
        interfaces = (relay.Node,)


class CityMutation(DjangoFormMutation):
    class Meta:
        form_class = CityForm


class Query(graphene.ObjectType):
    cities = graphene.List(CityType,id=graphene.ID(),name=graphene.String(),lat=graphene.Float(),lng=graphene.Float(),male_percentage=graphene.Int(),female_percentage=graphene.Int())
    city = graphene.Field(CityType, id=graphene.Int(),name=graphene.String())

    @staticmethod
    def resolve_cities(self,info,**kwargs):
        filters = {}
        for key, value in kwargs.items():
                filters[key] = value
        result=City.objects.filter(**filters)
        return result

    def resolve_city(self, info, id):
        return City.objects.get(pk=id)


class DeleteCity(CustomDeleteMutation):
    class Meta:
        model_class = City


class Mutation(graphene.ObjectType):
    upsert_city = CityMutation.Field()
    delete_city = DeleteCity.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
