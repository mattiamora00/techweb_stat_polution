import graphene

from graphene_django import DjangoObjectType
from graphene import relay, ObjectType
from ..models.Rilevation import Rilevation
from ..forms.Rilevation import RilevationForm
from graphene_django.forms.mutation import DjangoFormMutation
from graphene_django.forms.mutation import DjangoModelFormMutation
from pollutionstat._utilsGQL import CustomDeleteMutation
from graphene_django.filter import DjangoFilterConnectionField

class RilevationType(DjangoObjectType):
    class Meta:
        model = Rilevation
        fields = "__all__"
        filter_fields = [
            "id","timestamp","quantity"
        ]
        interfaces = (relay.Node,)


class RilevationMutation(DjangoFormMutation):
    class Meta:
        form_class = RilevationForm


class Query(graphene.ObjectType):
    rilevations = graphene.List(RilevationType,timestamp=graphene.DateTime(),quantity=graphene.Float())
    rilevation = graphene.Field(RilevationType, id=graphene.Int())

    @staticmethod
    def resolve_rilevations(self,info,**kwargs):
        filters = {}
        for key, value in kwargs.items():
                filters[key] = value
        result=Rilevation.objects.filter(**filters)
        return result

    def resolve_rilevation(self, info, id):
        return Rilevation.objects.get(pk=id)


class DeleteRilevation(CustomDeleteMutation):
    class Meta:
        model_class = Rilevation


class Mutation(graphene.ObjectType):
    upsert_rilevation = RilevationMutation.Field()
    delete_rilevation = DeleteRilevation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
