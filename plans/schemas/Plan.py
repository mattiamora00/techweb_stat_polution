import graphene

from graphene_django import DjangoObjectType
from graphene import relay, ObjectType
from ..models.Plan import Plan
from ..forms.Plan import PlanForm
from graphene_django.forms.mutation import DjangoFormMutation
from graphene_django.forms.mutation import DjangoModelFormMutation
from pollutionstat._utilsGQL import CustomDeleteMutation
from graphene_django.filter import DjangoFilterConnectionField

class PlanType(DjangoObjectType):
    class Meta:
        model = Plan
        fields = "__all__"
        filter_fields = {
            "id","name","city","description","start_date","end_date","success"
        }
        interfaces = (relay.Node,)


class PlanMutation(DjangoFormMutation):
    class Meta:
        form_class = PlanForm


class Query(graphene.ObjectType):
    plans = DjangoFilterConnectionField(PlanType)
    plan = graphene.Field(PlanType, id=graphene.Int())

    def resolve_plan(self, info, id):
        return Plan.objects.get(pk=id)


class DeletePlan(CustomDeleteMutation):
    class Meta:
        model_class = Plan


class Mutation(graphene.ObjectType):
    upsert_plan = PlanMutation.Field()
    delete_plan = DeletePlan.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
