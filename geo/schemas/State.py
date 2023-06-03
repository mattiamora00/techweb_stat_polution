import graphene

from graphene_django import DjangoObjectType
from graphene import relay, ObjectType
from ..models.State import State
from ..forms.State import StateForm
from graphene_django.forms.mutation import DjangoFormMutation
from graphene_django.forms.mutation import DjangoModelFormMutation
from pollutionstat._utilsGQL import CustomDeleteMutation
from graphene_django.filter import DjangoFilterConnectionField

class StateType(DjangoObjectType):
    class Meta:
        model = State
        fields = "__all__"
        filter_fields = [
            "id","iso_code","name"
        ]
        interfaces = (relay.Node,)


class StateMutation(DjangoFormMutation):
    class Meta:
        form_class = StateForm


class Query(graphene.ObjectType):
    states = DjangoFilterConnectionField(StateType)
    state = graphene.Field(StateType, id=graphene.Int())

    def resolve_state(self, info, id):
        return State.objects.get(pk=id)


class DeleteState(CustomDeleteMutation):
    class Meta:
        model_class = State


class Mutation(graphene.ObjectType):
    upsert_state = StateMutation.Field()
    delete_state = DeleteState.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
