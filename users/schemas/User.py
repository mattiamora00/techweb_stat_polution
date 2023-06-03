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
    users = DjangoFilterConnectionField(UserType)
    user = graphene.Field(UserType, id=graphene.Int())

    def resolve_user(self, info, id):
        return User.objects.get(pk=id)


class DeleteUser(CustomDeleteMutation):
    class Meta:
        model_class = User


class Mutation(graphene.ObjectType):
    upsert_user = UserMutation.Field()
    delete_user = DeleteUser.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
