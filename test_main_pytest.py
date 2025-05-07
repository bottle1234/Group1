import sys
import os
import uuid
import pytest
from fastapi.testclient import TestClient
import io
import datetime

# Ensure backend is on the path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "backend")))

from main import app

client = TestClient(app)

@pytest.fixture
def test_user():
    return {
        "username": f"testuser_{uuid.uuid4().hex[:6]}",
        "email": f"test_{uuid.uuid4().hex[:6]}@example.com",
        "password": "testpass"
    }

def test_signup(test_user):
    res = client.post("/auth/signup", json=test_user)
    assert res.status_code == 200
    assert res.json()["username"] == test_user["username"]

def test_login_success(test_user):
    client.post("/auth/signup", json=test_user)
    res = client.post("/auth/login", json={"username": test_user["username"], "password": test_user["password"]})
    assert res.status_code == 200
    assert res.json()["username"] == test_user["username"]

def test_login_failure():
    res = client.post("/auth/login", json={"username": "nonexistent", "password": "wrongpass"})
    assert res.status_code == 401
    assert "detail" in res.json()

def test_get_listings():
    res = client.get("/listings")
    assert res.status_code == 200
    assert isinstance(res.json(), list)
    for item in res.json():
        assert isinstance(item, dict)
        assert "id" in item
        assert "title" in item

def test_get_listing_by_id():
    listings = client.get("/listings").json()
    if listings:
        listing_id = listings[0]["id"]
        res = client.get(f"/listings/{listing_id}")
        assert res.status_code == 200
        assert res.json()["id"] == listing_id

def test_book_listing_authenticated(test_user):
    client.post("/auth/signup", json=test_user)
    login = client.post("/auth/login", json={"username": test_user["username"], "password": test_user["password"]})
    token = login.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"} if token else {}
    listings = client.get("/listings").json()
    if listings:
        res = client.post("/bookings", json={"listing_id": listings[0]["id"]}, headers=headers)
        assert res.status_code in (200, 201)

def test_contact_page():
    res = client.get("/contact")
    assert res.status_code == 200
    assert "email" in res.json()

def test_booking_history_authenticated(test_user):
    client.post("/auth/signup", json=test_user)
    login = client.post("/auth/login", json={"username": test_user["username"], "password": test_user["password"]})
    token = login.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"} if token else {}
    res = client.get("/bookings", headers=headers)
    assert res.status_code == 200
    assert isinstance(res.json(), list)

def test_export_result_to_file():
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    output_file = "test_result.txt"
    result = pytest.main(["-q", "--tb=short", "--maxfail=1", "--disable-warnings"], plugins=["pytest_cov"])
    with open(output_file, "w") as f:
        f.write(f"Test Results - {now}\n")
        f.write(f"Exit Code: {result}\n")
        f.write("Log Summary: All tests executed. Check above for details.\n")
