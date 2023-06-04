import graphene

from graphene_django import DjangoObjectType
from graphene import relay, ObjectType
from ..models.Cause import Cause
from ..forms.Cause import CauseForm
from graphene_django.forms.mutation import DjangoFormMutation
from graphene_django.forms.mutation import DjangoModelFormMutation
from pollutionstat._utilsGQL import CustomDeleteMutation
from graphene_django.filter import DjangoFilterConnectionField


class CauseType(DjangoObjectType):
    class Meta:
        model = Cause
        fields = "__all__"
        filter_fields = [
            "id"
        ]
        interfaces = (relay.Node,)


class CauseMutation(DjangoFormMutation):
    class Meta:
        form_class = CauseForm


class Query(graphene.ObjectType):
    causes = graphene.List(CauseType,id=graphene.ID(required=True))
    cause = graphene.Field(CauseType, id=graphene.Int())

    @staticmethod
    def resolve_states(self, info, **kwargs):
        filters = {}
        for key, value in kwargs.items():
            filters[key] = value
        result = Cause.objects.filter(**filters)
        return result

    def resolve_cause(self, info, id):
        return Cause.objects.get(pk=id)


class DeleteCause(CustomDeleteMutation):
    class Meta:
        model_class = Cause


class Mutation(graphene.ObjectType):
    upsert_cause = CauseMutation.Field()
    delete_cause = DeleteCause.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
