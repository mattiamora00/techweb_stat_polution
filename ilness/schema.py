import graphene

from .schemas.Cause import schema as cause
from .schemas.Illness import schema as ilness
from .schemas.Sick import schema as sick
from .schemas.SickIllness import schema as sickilness

class Query(
    cause.Query,
    ilness.Query,
    sick.Query,
    sickilness.Query
):
    pass


class Mutation(
    cause.Mutation,
    ilness.Mutation,
    sick.Mutation,
    sickilness.Mutation
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)

