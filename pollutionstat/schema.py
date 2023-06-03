import graphene
import geo.schema as geo
import ilness.schema as illness
import plans.schema as plans
import pollutants.schema as pollutants
import sensors.schema as sensor
import users.schema as user

class Query(geo.Query,
            plans.Query,
            illness.Query,
            pollutants.Query,
            sensor.Query,
            user.Query
            ):
    pass


class Mutation(geo.Mutation,
               plans.Mutation,
               illness.Mutation,
               pollutants.Mutation,
               sensor.Mutation,
               user.Mutation
               ):
    pass


schema = graphene.Schema(query=Query,mutation=Mutation)
