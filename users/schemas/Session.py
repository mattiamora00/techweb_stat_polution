import json

import graphene
from graphene.types.generic import GenericScalar

from graphene_django import DjangoObjectType
from graphene import relay, ObjectType

from ..models.Session import Session
from ..models.User import User
from ..forms.Session import SessionForm
from graphene_django.forms.mutation import DjangoFormMutation
from graphene_django.forms.mutation import DjangoModelFormMutation
from pollutionstat._utilsGQL import CustomDeleteMutation
from graphene_django.filter import DjangoFilterConnectionField
import hashlib
import string, random

class SessionType(DjangoObjectType):
    class Meta:
        model = User
        fields = "__all__"
        filter_fields = [
            "id"
        ]
        interfaces = (relay.Node,)


class SessionMutation(DjangoFormMutation):
    class Meta:
        form_class = SessionForm


class Query(graphene.ObjectType):
    sessions = graphene.List(SessionType,username=graphene.String(),email=graphene.String())
    session = graphene.Field(SessionType, id=graphene.Int())
    session_user_id = GenericScalar(token=graphene.String())

    @staticmethod
    def resolve_sessions(self,info,**kwargs):
        filters = {}
        for key, value in kwargs.items():
                filters[key] = value
        result=Session.objects.filter(**filters)
        return result

    def resolve_session(self, info, id):
        return Session.objects.get(pk=id)

    def resolve_session_user_id(self,info,token):
        session = Session.objects.filter(token=hashlib.sha256(token.encode('utf-8')).hexdigest())
        if len(session) == 1:
            user=User.objects.get(pk=session[0].user_id.id)
            return json.dumps({"userId": user.id, "userData": {"id":user.id,"username":user.username,"email":user.email ,"imageProfile":user.profile_image.name,"viewPlan":user.view_plan,"viewSensor":user.view_sensor,"viewSick":user.view_sick,"viewGraph":user.view_graph,"password":user.password}})
        else:
            return -1

class DeleteSession(CustomDeleteMutation):
    class Meta:
        model_class = Session


class Mutation(graphene.ObjectType):
    upsert_session = SessionMutation.Field()
    delete_session = DeleteSession.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)