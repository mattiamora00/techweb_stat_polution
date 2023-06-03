import graphene

from graphene_django import DjangoObjectType
from graphene import relay, ObjectType
from ..models.SickIllness import SickIllness
from ..forms.SickIllness import SickIllnessForm
from graphene_django.forms.mutation import DjangoFormMutation
from graphene_django.forms.mutation import DjangoModelFormMutation
from pollutionstat._utilsGQL import CustomDeleteMutation
from graphene_django.filter import DjangoFilterConnectionField


class SickIlnessType(DjangoObjectType):
    class Meta:
        model = SickIllness
        fields = "__all__"
        filter_fields = {
            "id"
        }
        interfaces = (relay.Node,)


class SickIlnessMutation(DjangoFormMutation):
    class Meta:
        form_class = SickIllnessForm


class Query(graphene.ObjectType):
    sicks_ilnesses = DjangoFilterConnectionField(SickIlnessType)
    sick_ilness = graphene.Field(SickIlnessType, id=graphene.Int())

    def resolve_sicks_ilnesses(self, info, **kwargs):
        return SickIllness.objects.all()

    def resolve_sick_ilness(self, info, id):
        return SickIllness.objects.get(pk=id)


class DeleteSickIlness(CustomDeleteMutation):
    class Meta:
        model_class = SickIllness


class Mutation(graphene.ObjectType):
    upsert_sick_ilness = SickIlnessMutation.Field()
    delete_sick_ilness = DeleteSickIlness.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
