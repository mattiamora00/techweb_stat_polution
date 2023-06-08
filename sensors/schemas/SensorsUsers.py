import graphene

from graphene_django import DjangoObjectType
from graphene import relay, ObjectType
from ..models.SensorsUsers import SensorsUsers
from ..forms.SensorsUsers import SensorsUsersForm
from graphene_django.forms.mutation import DjangoFormMutation
from graphene_django.forms.mutation import DjangoModelFormMutation
from pollutionstat._utilsGQL import CustomDeleteMutation
from graphene_django.filter import DjangoFilterConnectionField

class SensorsUsersType(DjangoObjectType):
    class Meta:
        model = SensorsUsers
        fields = "__all__"


class SensorsUsersMutation(DjangoFormMutation):
    class Meta:
        form_class = SensorsUsersForm


class Query(graphene.ObjectType):
    sensorsusers = graphene.List(SensorsUsersType,timestamp=graphene.DateTime(),quantity=graphene.Float())
    sensorsuser = graphene.Field(SensorsUsersType, id=graphene.Int())

    @staticmethod
    def resolve_sensorsusers(self,info,**kwargs):
        filters = {}
        for key, value in kwargs.items():
                filters[key] = value
        result=SensorsUsers.objects.filter(**filters)
        return result

    def resolve_sensoruser(self, info, id):
        return SensorsUsers.objects.get(pk=id)


class DeleteSensorsUsers(CustomDeleteMutation):
    class Meta:
        model_class = SensorsUsers


class Mutation(graphene.ObjectType):
    upsert_rilevation = SensorsUsersMutation.Field()
    delete_rilevation = DeleteSensorsUsers.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
