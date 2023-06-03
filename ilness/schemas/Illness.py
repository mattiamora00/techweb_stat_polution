import graphene

from graphene_django import DjangoObjectType
from graphene import relay, ObjectType
from ..models.Illness import Illness
from ..forms.Illness import IllnessForm
from graphene_django.forms.mutation import DjangoFormMutation
from graphene_django.forms.mutation import DjangoModelFormMutation
from pollutionstat._utilsGQL import CustomDeleteMutation
from graphene_django.filter import DjangoFilterConnectionField


class IlnessType(DjangoObjectType):
    class Meta:
        model = Illness
        fields = "__all__"
        filter_fields = [
            "id"
        ]
        interfaces = (relay.Node,)


class IlnessMutation(DjangoFormMutation):
    class Meta:
        form_class = IllnessForm


class Query(graphene.ObjectType):
    ilnesses = DjangoFilterConnectionField(IlnessType)
    ilnee = graphene.Field(IlnessType, id=graphene.Int())

    def resolve_ilnee(self, info, id):
        return Illness.objects.get(pk=id)


class DeleteIlness(CustomDeleteMutation):
    class Meta:
        model_class = Illness


class Mutation(graphene.ObjectType):
    upsert_ilness = IlnessMutation.Field()
    delete_ilness = DeleteIlness.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
