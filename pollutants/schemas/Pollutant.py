import json

import graphene

from graphene_django import DjangoObjectType
from graphene import relay, ObjectType
from ..models.Pollutant import Pollutant
from geo.models.City import City
from sensors.models.Sensor import Sensor
from sensors.models.Rilevation import Rilevation
from ..forms.Pollutant import PollutantForm
from graphene_django.forms.mutation import DjangoFormMutation
from graphene_django.forms.mutation import DjangoModelFormMutation
from pollutionstat._utilsGQL import CustomDeleteMutation
from graphene_django.filter import DjangoFilterConnectionField
from graphene.types.generic import GenericScalar

class PollutantType(DjangoObjectType):
    class Meta:
        model = Pollutant
        fields = "__all__"
        filter_fields = [
            "id","name","threshold"
        ]
        interfaces = (relay.Node,)


class PollutantMutation(DjangoFormMutation):
    class Meta:
        form_class = PollutantForm


class Query(graphene.ObjectType):
    pollutants = graphene.List(PollutantType,name=graphene.String(),threshold=graphene.Float())
    pollutant = graphene.Field(PollutantType, id=graphene.Int())
    pollutants_of_city = GenericScalar(city=graphene.String(required=True))

    @staticmethod
    def resolve_pollutants_of_city(self,info,city):
        city_id=City.objects.get(name=city).id
        sensors_list=Sensor.objects.filter(city_id=city_id)
        dataSet = {}
        for sensor in sensors_list:
            rilevation_list = [{"quantity":rilevation.quantity,"timestamp":rilevation.timestamp}  for rilevation in Rilevation.objects.filter(sensor_id=sensor.id)]
            pollutant_name=sensor.pollutant.name
            if sensor.pollutant.name in dataSet:
                var = dataSet[sensor.pollutant.name] + rilevation_list
                dataSet[sensor.pollutant.name]=var
            else:
                dataSet[pollutant_name]=rilevation_list

        return json.dumps(dataSet, indent=4, sort_keys=True, default=str)

    @staticmethod
    def resolve_pollutants(self, info, **kwargs):
        filters = {}
        for key, value in kwargs.items():
            filters[key] = value
        result = Pollutant.objects.filter(**filters)
        return result

    def resolve_pollutant(self, info, id):
        return Pollutant.objects.get(pk=id)


class DeletePollutant(CustomDeleteMutation):
    class Meta:
        model_class = Pollutant


class Mutation(graphene.ObjectType):
    upsert_pollutant = PollutantMutation.Field()
    delete_pollutant = DeletePollutant.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
