import graphene

from .schemas.Pollutant import schema as pollutant
from .schemas.PollutionType import schema as pollutanttype

class Query(
    pollutant.Query,
    pollutanttype.Query,
):
    pass


class Mutation(
    pollutant.Mutation,
    pollutanttype.Mutation,
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)

