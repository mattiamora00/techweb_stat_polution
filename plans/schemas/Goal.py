import graphene

from graphene_django import DjangoObjectType
from graphene import relay, ObjectType
from ..models.Goal import Goal
from ..forms.Goal import GoalForm
from graphene_django.forms.mutation import DjangoFormMutation
from graphene_django.forms.mutation import DjangoModelFormMutation
from pollutionstat._utilsGQL import CustomDeleteMutation
from graphene_django.filter import DjangoFilterConnectionField

class GoalType(DjangoObjectType):
    class Meta:
        model = Goal
        fields = "__all__"
        filter_fields = [
            "id","current_quantity","goal_threshold"
        ]
        interfaces = (relay.Node,)


class GoalMutation(DjangoFormMutation):
    class Meta:
        form_class = GoalForm


class Query(graphene.ObjectType):
    goals = graphene.List(GoalType,id=graphene.ID(),current_quantity=graphene.Float(),goal_threshold=graphene.Float())
    goal = graphene.Field(GoalType, id=graphene.Int())

    @staticmethod
    def resolve_goals(self, info, **kwargs):
        filters = {}
        for key, value in kwargs.items():
            filters[key] = value
        result = Goal.objects.filter(**filters)
        return result

    def resolve_goal(self, info, id):
        return Goal.objects.get(pk=id)


class DeleteGoal(CustomDeleteMutation):
    class Meta:
        model_class = Goal


class Mutation(graphene.ObjectType):
    upsert_goal = GoalMutation.Field()
    delete_goal = DeleteGoal.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
