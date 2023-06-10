from django.test import TestCase
import json
from graphene_django.utils.testing import GraphQLTestCase
from .models.State import State

class MyTestCase(GraphQLTestCase):
    GRAPHQL_URL = "/graphql/"

    #def test_sensor_insert(self):
    def test_states_query(self):
        new_state = State(iso_code='IT', name='Italy')
        new_state.save()

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
        new_state = State(name='Milano')
        new_state.save()

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