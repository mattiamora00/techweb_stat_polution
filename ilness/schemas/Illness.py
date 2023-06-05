import graphene

from graphene_django import DjangoObjectType
from graphene import relay, ObjectType
from ..models.Illness import Illness
from geo.models.City import City
from ..forms.Illness import IllnessForm
from graphene_django.forms.mutation import DjangoFormMutation
from graphene_django.forms.mutation import DjangoModelFormMutation
from pollutionstat._utilsGQL import CustomDeleteMutation
from graphene_django.filter import DjangoFilterConnectionField
from graphene.types.generic import GenericScalar


class IlnessType(DjangoObjectType):
    class Meta:
        model = Illness
        fields = "__all__"
        filter_fields = [
            "id", "nome", "mortality_index", "average_duration_days"
        ]
        interfaces = (relay.Node,)


class IlnessMutation(DjangoFormMutation):
    class Meta:
        form_class = IllnessForm


class Query(graphene.ObjectType):
    ilnesses = graphene.List(IlnessType, id=graphene.ID(), nome=graphene.String(), mortality_index=graphene.Int(),
                             average_duration_days=graphene.Int())
    ilnes = graphene.Field(IlnessType, id=graphene.Int())
    ilness_city = GenericScalar(city=graphene.String())

    @staticmethod
    def resolve_ilness_city(self,info, city):
        city_id=City.objects.get(name__exact=city).id
        illness_list= [{"name":illness.nome,"mortality_index":illness.mortality_index,"average_duration_days":illness.average_duration_days}  for illness in Illness.objects.filter(sickillness__sick__population_id=city_id)]
        return illness_list


    @staticmethod
    def resolve_ilnesses(self,info, **kwargs):
        filters = {}
        for key, value in kwargs.items():
            filters[key] = value
        result = Illness.objects.filter(**filters)
        return result

    def resolve_ilnes(self, info, id):
        return Illness.objects.get(pk=id)


class DeleteIlness(CustomDeleteMutation):
    class Meta:
        model_class = Illness


class Mutation(graphene.ObjectType):
    upsert_ilness = IlnessMutation.Field()
    delete_ilness = DeleteIlness.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
