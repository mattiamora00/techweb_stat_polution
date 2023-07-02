from django.test import TestCase
from geo.models.City import City
import json
from graphene_django.utils.testing import GraphQLTestCase

from geo.models.State import State


class Pollutants(GraphQLTestCase):
    GRAPHQL_URL = "/graphql/"


    def setUp(self):
        self.state = State.objects.create(name="Italia", iso_code="IT")
        self.city = City.objects.create(name="Genova",lat=0,lng=0,state_id=self.state.id)

    def test_pollution_of_city(self):
        response = self.query(
            '''
            query PollutantOfCity($city:String!){
              pollutantsOfCity(city:$city)
            }
            ''',
            operation_name="PollutantOfCity",
            variables={'city': self.city.name}
        )

        content = json.loads(response.content)
        # This validates the status code and if you get errors
        self.assertResponseNoErrors(response)
