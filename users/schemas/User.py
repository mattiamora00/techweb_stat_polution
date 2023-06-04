import graphene

from graphene_django import DjangoObjectType
from graphene import relay, ObjectType
from ..models.User import User
from ..forms.User import UserForm
from graphene_django.forms.mutation import DjangoFormMutation
from graphene_django.forms.mutation import DjangoModelFormMutation
from pollutionstat._utilsGQL import CustomDeleteMutation
from graphene_django.filter import DjangoFilterConnectionField

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = "__all__"
        filter_fields = [
            "id","username","email"
        ]
        interfaces = (relay.Node,)


class UserMutation(DjangoFormMutation):
    class Meta:
        form_class = UserForm


class Query(graphene.ObjectType):
    users = graphene.List(UserType,username=graphene.String(),email=graphene.String())
    user = graphene.Field(UserType, id=graphene.Int())

    @staticmethod
    def resolve_users(self,info,**kwargs):
        filters = {}
        for key, value in kwargs.items():
                filters[key] = value
        result=User.objects.filter(**filters)
        return result

    def resolve_user(self, info, id):
        return User.objects.get(pk=id)


class DeleteUser(CustomDeleteMutation):
    class Meta:
        model_class = User


class Mutation(graphene.ObjectType):
    upsert_user = UserMutation.Field()
    delete_user = DeleteUser.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
