import graphene

from graphene_django import DjangoObjectType
from graphene import relay, ObjectType
from ..models.Sick import Sick
from ..forms.Sick import SickForm
from graphene_django.forms.mutation import DjangoFormMutation
from graphene_django.forms.mutation import DjangoModelFormMutation
from pollutionstat._utilsGQL import CustomDeleteMutation
from graphene_django.filter import DjangoFilterConnectionField


class SickType(DjangoObjectType):
    class Meta:
        model = Sick
        fields = "__all__"
        filter_fields = [
            "id","fiscal_code","name","surname","gender",
        ]
        interfaces = (relay.Node,)


class SickMutation(DjangoFormMutation):
    class Meta:
        form_class = SickForm


class Query(graphene.ObjectType):
    sicks = graphene.List(SickType,id=graphene.ID(),fiscal_code=graphene.String(),surname=graphene.String(),gender=graphene.String())
    sick = graphene.Field(SickType, id=graphene.Int())

    @staticmethod
    def resolve_sicks(self, info, **kwargs):
        filters = {}
        for key, value in kwargs.items():
            filters[key] = value
        result = Sick.objects.filter(**filters)
        return result

    def resolve_sick(self, info, id):
        return Sick.objects.get(pk=id)


class DeleteSick(CustomDeleteMutation):
    class Meta:
        model_class = Sick


class Mutation(graphene.ObjectType):
    upsert_sick = SickMutation.Field()
    delete_sick = DeleteSick.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
