import graphene

from .schemas.Rilevation import schema as rilevation
from .schemas.Sensor import schema as sensor
from .schemas.SensorsUsers import schema as sensorusers

class Query(
    rilevation.Query,
    sensor.Query,
    sensorusers.Query
):
    pass


class Mutation(
    rilevation.Mutation,
    sensor.Mutation,
    sensorusers.Mutation
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)

