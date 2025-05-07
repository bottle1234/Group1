import sys
import os
import unittest
from fastapi.testclient import TestClient

# Ensure backend is on the path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "backend")))

from main import app

client = TestClient(app)

class TestStayBnbAPI(unittest.TestCase):

    def test_signup_and_login(self):
        user = {"username": "testuser", "email": "test@example.com", "password": "testpass"}
        res = client.post("/auth/signup", json=user)
        if res.status_code == 400:
            self.assertEqual(res.json()["detail"], "Username already exists")
        else:
            self.assertEqual(res.status_code, 200)
            self.assertEqual(res.json()["username"], user["username"])

        res = client.post("/auth/login", json={"username": "testuser", "password": "testpass"})
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["username"], user["username"])

    def test_get_listings(self):
        res = client.get("/listings/")
        self.assertEqual(res.status_code, 200)
        self.assertIsInstance(res.json(), list)

    def test_create_listing(self):
        listing = {
            "title": "UnitTest Listing",
            "description": "A unit test listing",
            "price": 111.0,
            "image": "http://example.com/test.jpg",
            "rating": 4.0,
            "reviews": 5,
            "type": "UnitTest",
            "beds": 1,
            "baths": 1
        }
        res = client.post("/listings/", json=listing)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["title"], "UnitTest Listing")

    def test_create_and_cancel_booking(self):
        booking = {"listing_id": 1, "username": "testuser"}
        res = client.post("/bookings/", json=booking)
        self.assertEqual(res.status_code, 200)
        booking_id = res.json()["id"]

        res = client.get("/bookings/")
        self.assertEqual(res.status_code, 200)
        self.assertIsInstance(res.json(), list)

        res = client.delete(f"/bookings/{booking_id}")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["message"], "Booking cancelled")

    def test_contact_info(self):
        res = client.get("/contact/")
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertIn("email", data)
        self.assertIn("phone", data)
        self.assertIn("address", data)

if __name__ == "__main__":
    with open("test_results.txt", "w") as f:
        runner = unittest.TextTestRunner(stream=f, verbosity=2)
        unittest.main(testRunner=runner, exit=False)
