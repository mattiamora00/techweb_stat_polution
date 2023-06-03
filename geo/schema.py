import graphene

from .schemas.City import schema as city
from .schemas.State import schema as state

class Query(
    city.Query,
    state.Query
):
    pass


class Mutation(
    city.Mutation,
    state.Mutation
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)

