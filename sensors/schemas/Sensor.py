import graphene

from graphene_django import DjangoObjectType
from graphene import relay, ObjectType
from ..models.Sensor import Sensor
from ..forms.Sensor import SensorForm
from graphene_django.forms.mutation import DjangoFormMutation
from graphene_django.forms.mutation import DjangoModelFormMutation
from pollutionstat._utilsGQL import CustomDeleteMutation
from graphene_django.filter import DjangoFilterConnectionField

class SensorType(DjangoObjectType):
    class Meta:
        model = Sensor
        fields = "__all__"
        filter_fields = [
            "id","sensor_code","lat","lng","date_change_filter","oxidation_level","sensor_model"
        ]
        interfaces = (relay.Node,)


class SensorMutation(DjangoFormMutation):
    class Meta:
        form_class = SensorForm


class Query(graphene.ObjectType):
    sensors = DjangoFilterConnectionField(SensorType)
    sensor = graphene.Field(SensorType, id=graphene.Int())

    def resolve_sensor(self, info, id):
        return Sensor.objects.get(pk=id)


class DeleteSensor(CustomDeleteMutation):
    class Meta:
        model_class = Sensor


class Mutation(graphene.ObjectType):
    upsert_sensor = SensorMutation.Field()
    delete_sensor = DeleteSensor.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
