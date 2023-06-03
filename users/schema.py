import graphene

from .schemas.User import schema as user

class Query(
    user.Query,
):
    pass


class Mutation(
    user.Mutation,
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)

