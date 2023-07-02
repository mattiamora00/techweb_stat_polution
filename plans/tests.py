from django.test import TestCase
from geo.models.City import City
import json
from graphene_django.utils.testing import GraphQLTestCase

from geo.models.State import State


class Plans(GraphQLTestCase):
    GRAPHQL_URL = "/graphql/"

    def setUp(self):
        self.state = State.objects.create(name="Italia", iso_code="IT")
        self.city = City.objects.create(name="Genova", lat=0, lng=0, state_id=self.state.id)

    def test_plan_of_city(self):
        response = self.query(
            '''
            query city($name:String!){
              city(name:$name){
                planSet{
                  edges{
                    node{
                      id
                      name
                      startDate
                      endDate
                      success
                      description
                      goalSet{
                        edges{
                          node{
                            id
                            goalThreshold
                            pollutant{
                              id
                              name
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            ''',
            operation_name="city",
            variables={'name': self.city.name}
        )
        content = json.loads(response.content)

        # This validates the status code and if you get errors
        self.assertResponseNoErrors(response)
