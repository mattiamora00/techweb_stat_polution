from django.test import TestCase
from .models.User import User
import json
from graphene_django.utils.testing import GraphQLTestCase

class MyTestCase(GraphQLTestCase):
    GRAPHQL_URL = "/graphql/"

    def test_read_user(self):

        response = self.query(
            '''
            query{
                users{
                    id
                    username
             }
            }
            '''
        )

        content = json.loads(response.content)
        self.assertResponseNoErrors(response)

