import graphene

from .schemas.User import schema as user
from .schemas.Session import schema as session

class Query(
    user.Query,
    session.Query,
):
    pass


class Mutation(
    user.Mutation,
    session.Mutation,
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)

