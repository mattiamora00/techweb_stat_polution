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
    sicks = DjangoFilterConnectionField(SickType)
    sick = graphene.Field(SickType, id=graphene.Int())

    def resolve_sick(self, info, id):
        return Sick.objects.get(pk=id)


class DeleteSick(CustomDeleteMutation):
    class Meta:
        model_class = Sick


class Mutation(graphene.ObjectType):
    upsert_sick = SickMutation.Field()
    delete_sick = DeleteSick.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
