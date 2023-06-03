import graphene

from graphene_django import DjangoObjectType
from graphene import relay, ObjectType
from ..models.Pollutant import Pollutant
from ..forms.Pollutant import PollutantForm
from graphene_django.forms.mutation import DjangoFormMutation
from graphene_django.forms.mutation import DjangoModelFormMutation
from pollutionstat._utilsGQL import CustomDeleteMutation
from graphene_django.filter import DjangoFilterConnectionField

class PollutantType(DjangoObjectType):
    class Meta:
        model = Pollutant
        fields = "__all__"
        filter_fields = [
            "id","name","threshold"
        ]
        interfaces = (relay.Node,)


class PollutantMutation(DjangoFormMutation):
    class Meta:
        form_class = PollutantForm


class Query(graphene.ObjectType):
    pollutants = DjangoFilterConnectionField(PollutantType)
    pollutant = graphene.Field(PollutantType, id=graphene.Int())

    def resolve_pollutant(self, info, id):
        return Pollutant.objects.get(pk=id)


class DeletePollutant(CustomDeleteMutation):
    class Meta:
        model_class = Pollutant


class Mutation(graphene.ObjectType):
    upsert_pollutant = PollutantMutation.Field()
    delete_pollutant = DeletePollutant.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
