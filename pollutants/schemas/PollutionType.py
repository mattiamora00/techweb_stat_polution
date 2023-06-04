import graphene

from graphene_django import DjangoObjectType
from graphene import relay, ObjectType
from ..models.PollutionType import PollutionType
from ..forms.PollutionType import PollutionTypeForm
from graphene_django.forms.mutation import DjangoFormMutation
from graphene_django.forms.mutation import DjangoModelFormMutation
from pollutionstat._utilsGQL import CustomDeleteMutation
from graphene_django.filter import DjangoFilterConnectionField

class PollutionTypeType(DjangoObjectType):
    class Meta:
        model = PollutionType
        fields = "__all__"
        filter_fields = [
            "id","name"
        ]
        interfaces = (relay.Node,)


class PollutionTypeMutation(DjangoFormMutation):
    class Meta:
        form_class = PollutionTypeForm


class Query(graphene.ObjectType):
    pollutants_types = graphene.List(PollutionTypeType,name=graphene.String())
    pollutant_type = graphene.Field(PollutionTypeType, id=graphene.Int())

    @staticmethod
    def resolve_pollutants_types(self, info, **kwargs):
        filters = {}
        for key, value in kwargs.items():
            filters[key] = value
        result = PollutionType.objects.filter(**filters)
        return result

    def resolve_pollutant(self, info, id):
        return PollutionType.objects.get(pk=id)


class DeletePollutionType(CustomDeleteMutation):
    class Meta:
        model_class = PollutionType


class Mutation(graphene.ObjectType):
    upsert_pollutant_type = PollutionTypeMutation.Field()
    delete_pollutant_type = DeletePollutionType.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
