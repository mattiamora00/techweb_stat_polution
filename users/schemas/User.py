import json

import graphene
from graphene.types.generic import GenericScalar

from graphene_django import DjangoObjectType
from graphene import relay, ObjectType

from ..models.Session import Session
from ..models.User import User
from ..forms.User import UserForm
from graphene_django.forms.mutation import DjangoFormMutation
from graphene_django.forms.mutation import DjangoModelFormMutation
from pollutionstat._utilsGQL import CustomDeleteMutation
from graphene_django.filter import DjangoFilterConnectionField
import hashlib
import string, random

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = "__all__"
        filter_fields = [
            "id","username","email"
        ]
        interfaces = (relay.Node,)


class UserMutation(DjangoModelFormMutation):
    class Meta:
        form_class = UserForm


    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        if "id" in input:
            return super().mutate_and_get_payload(root, info, **input)
        else:
            username=input["username"]
            password=input["password"]
            email=input["email"]
            crypt_password = hashlib.sha256(password.encode('utf-8')).hexdigest()
            if "imageProfile" in input:
                image_profile=input["imageProfile"]
                User.objects.create(email=email, username=username, password=crypt_password,
                                    image_profile=image_profile)
            else:
                User.objects.create(email=email, username=username, password=crypt_password)
            return super().mutate_and_get_payload(root, info, **input)


class Query(graphene.ObjectType):
    users = graphene.List(UserType,username=graphene.String(),email=graphene.String())
    user = graphene.Field(UserType, id=graphene.Int())
    user_auth = GenericScalar(username=graphene.String(),password=graphene.String())

    @staticmethod
    def resolve_users(self,info,**kwargs):
        filters = {}
        for key, value in kwargs.items():
                filters[key] = value
        result=User.objects.filter(**filters)
        return result

    def resolve_user(self, info, id):
        return User.objects.get(pk=id)

    def resolve_user_auth(self, info, username, password):
        user = User.objects.get(username=username)
        if user is not None:
            hash_pw = hashlib.sha256(password.encode('utf-8')).hexdigest()
            if user.password==hash_pw:
                letters = string.ascii_lowercase
                token = ''.join(random.choice(letters) for i in range(30))
                new_session = Session(token=hashlib.sha256(token.encode('utf-8')).hexdigest(), user_id_id=user.id)
                new_session.save()
                return json.dumps({"success": True, "token": token})
            else:
                return json.dumps({"success": False, "error": "Error: wrong password"})
        else:
            return json.dumps({"success": False, "error": "Error: user not found"})

class DeleteUser(CustomDeleteMutation):
    class Meta:
        model_class = User


class Mutation(graphene.ObjectType):
    upsert_user = UserMutation.Field()
    delete_user = DeleteUser.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)