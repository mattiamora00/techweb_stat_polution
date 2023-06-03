import graphene

from .schemas.Goal import schema as cause
from .schemas.Plan import schema as ilness

class Query(
    cause.Query,
    ilness.Query,
):
    pass


class Mutation(
    cause.Mutation,
    ilness.Mutation,
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)

