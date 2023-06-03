import graphene

from .schemas.Rilevation import schema as rilevation
from .schemas.Sensor import schema as sensor

class Query(
    rilevation.Query,
    sensor.Query
):
    pass


class Mutation(
    rilevation.Mutation,
    sensor.Mutation
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)

