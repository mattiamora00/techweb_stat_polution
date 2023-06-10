from django.test import TestCase

from geo.models.City import City
from geo.models.State import State
from pollutants.models.Pollutant import Pollutant
from pollutants.models.PollutionType import PollutionType
from .models.Sensor import Sensor
from users.models.User import User
import json
from graphene_django.utils.testing import GraphQLTestCase

class MyTestCase(GraphQLTestCase):
    GRAPHQL_URL = "/graphql/"

    def setUp(self):
        self.user = User.objects.create(username="prova",email="prova@email.it",password="12345678")
        self.state = State.objects.create(name="Italia",iso_code="IT")
        self.city = City.objects.create(name="Milano",lat=0,lng=0,state_id=self.state.id,)
        self.pollution_type = PollutionType.objects.create(name="Aria")
        self.pollutant = Pollutant.objects.create(name="Prova",threshold=0,type_id=self.pollution_type.id)
        self.sensor = Sensor.objects.create(sensor_code="123",lat=0,lng=0,city_id=self.city.id,
                                            pollutant_id=self.pollutant.id,sensor_model="AX123")

    def test_sensors_query(self):
        response = self.query(
            '''
           query UserSensor($userId:Int) {
            user(id:$userId){
            sensorsusersSet{
                sensor{
                  id,
                  lat,
                  lng,
                  sensorCode,
                  pollutant{
                    id,
                    name
                  },
                  city{
                    id,
                    name
                  }
                } 	
               }
              }
            }
            ''',
            operation_name="UserSensor",
            variables={'userId': self.user.id}
        )

        content = json.loads(response.content)

        # This validates the status code and if you get errors
        self.assertResponseNoErrors(response)

    def test_sensors_rilevation(self):
        response = self.query(
            '''
           query SensorRilevations($sensorCode:String!){
              sensor(sensorCode:$sensorCode){
                sensorCode
                rilevationSet{
                  edges{
                    node{
                      id
                      timestamp
                      quantity
                    }
                  }
                }
              }
            }
            ''',
            operation_name="SensorRilevations",
            variables={'sensorCode': self.sensor.sensor_code}
        )

        content = json.loads(response.content)

        # This validates the status code and if you get errors
        self.assertResponseNoErrors(response)
