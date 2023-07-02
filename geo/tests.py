from django.test import TestCase
import json
from graphene_django.utils.testing import GraphQLTestCase

from .models.City import City
from .models.State import State


class GeoTest(GraphQLTestCase):
    GRAPHQL_URL = "/graphql/"

    def setUp(self):
        self.state = State.objects.create(name="Italia", iso_code="IT")
        self.city = City.objects.create(name="Milano",lat=45.4613,lng=9.1595,state=self.state)

    def test_states_query(self):
        response = self.query(
            '''
            query {
                states {
                    isoCode
                    name
                }
            }
            '''
        )
        content = json.loads(response.content)

        # This validates the status code and if you get errors
        self.assertResponseNoErrors(response)

    def test_city_query(self):
        response = self.query(
            '''
            query cities {
              cities {
                id
                name
                lat
                lng
              }
            }
            '''
        )
        content = json.loads(response.content)

        # This validates the status code and if you get errors
        self.assertResponseNoErrors(response)
