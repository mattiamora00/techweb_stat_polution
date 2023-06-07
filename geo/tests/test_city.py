import json

from graphene_django.utils.testing import GraphQLTestCase
from django.contrib.auth.models import User
from pollutionstat._utilsGQL import get_content

USERNAME = 'test'
PASSWORD = 'testingpassword'
EMAIl = 'test@test.it'


class TestCity(GraphQLTestCase):

    def setUp(self) -> None:
        self.test_user = User.objects.create(username=USERNAME, email=EMAIl)
        self.test_user.set_password(PASSWORD)
        self.test_user.save()

    def tearDown(self) -> None:
        self.test_user.delete()

    def test_add_state(self) -> None:
        response = self.query(
            '''
              mutation upsertState($name:String!,$isoCode:String!){
                  upsertState(input:{name:$name,isoCode:$isoCode}){
                    name
                  }
                }
                    ''',
            operation_name="upsertState",
            variables={'name': "Italy", 'isoCode':"IT" }
        )
        content = json.loads(response.content)
        self.assertResponseNoErrors(response)
        self.assertEquals(response.status_code, 200)

    def test_add_city(self) -> None:
        response = self.query(
            '''
               mutation upsertCity($name:String!,$lat:Float!,$lng:Float!,$state:ID!){
                  upsertCity(input:{name:$name,lat:$lat,lng:$lng,state:$state}){
                    name
                    errors{
                        messages
                    }
                  }
                }
            ''',
            operation_name="upsertCity",
            variables={'name':"Test", 'lat': 0,'lng':0,}
        )
        content = json.loads(response.content)
        self.assertResponseNoErrors(response)
        self.assertEquals(response.status_code, 200)

    def test_get_states(self) -> None:
        response = self.query(
            """
            query states{
              states{
                id
                isoCode
                name
              }
            }
            """,
            operation_name="states",
        )
        content = json.loads(response.content)
        self.assertResponseNoErrors(response)
        self.assertEquals(response.status_code, 200)

    def test_get_cities(self) -> None:
        response = self.query(
            """
            query citites{
              cities{
                id
                name
                lat
                lng
                malePercentage
                femalePercentage
                state{
                  id
                  isoCode
                }
              }
            }
            """,
            operation_name="cities",
        )
        content = json.loads(response.content)
        self.assertResponseNoErrors(response)
        self.assertEquals(response.status_code, 200)
