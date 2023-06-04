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
    pollutants_of_city = graphene.List(PollutantType,city=graphene.String())

    @staticmethod
    def resolve_pollutants_of_city(self,info,**kwargs):
        city=kwargs["city"]
        city_id=City.objects.get(name=city).id
        sensors_list=Sensor.objects.filter(city_id=city_id)
        dataSet = {}
        for sensor in sensors_list:
            rilevation_list = [rilevation  for rilevation in Rilevation.objects.filter(sensor_id=sensor.id)]
            pollutant_name=sensor.pollutant.name
            if sensor.pollutant.name in dataSet:
                dataSet[sensor.pollutant.name].append(rilevation_list)
            else:
                new_pollutant=[]
                new_pollutant.append("s")
                dataSet[pollutant_name]=new_pollutant
        res=[]
        res.append(dataSet)
        return res

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
