import unittest

from app import app


class StaticAppTests(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_homepage_is_served(self):
        response = self.client.get('/')

        try:
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'Himalayan Digitals', response.data)
        finally:
            response.close()

    def test_api_routes_are_disabled(self):
        response = self.client.post('/api/login', json={})

        try:
            self.assertEqual(response.status_code, 405)
        finally:
            response.close()


if __name__ == '__main__':
    unittest.main()
