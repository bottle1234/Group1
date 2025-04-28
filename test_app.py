import unittest
from app import app, db
from flask import json
import os

class StaybnbTestCase(unittest.TestCase):

    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app = app.test_client()
        with app.app_context():
            db.create_all()

    def tearDown(self):
        with app.app_context():
            db.session.remove()
            db.drop_all()

    # --- AUTH ---
    def test_login_success(self):
        res = self.app.post('/auth/login', json={'username': 'admin', 'password': 'admin'})
        self.assertEqual(res.status_code, 200)
        self.assertIn('Login successfully', res.get_data(as_text=True))

    def test_login_failure(self):
        res = self.app.post('/auth/login', json={'username': 'admin', 'password': 'wrong'})
        self.assertEqual(res.status_code, 401)

    def test_login_missing_fields(self):
        res = self.app.post('/auth/login', json={})
        self.assertEqual(res.status_code, 401)

    # --- LISTINGS ---
    def test_get_listings(self):
        res = self.app.get('/listings/')
        self.assertEqual(res.status_code, 200)

    def test_add_listing(self):
        res = self.app.post('/listings/', json={'title': 'Test House'})
        self.assertEqual(res.status_code, 201)

    def test_add_listing_missing_fields(self):
        res = self.app.post('/listings/', json={})
        self.assertEqual(res.status_code, 201)

    def test_get_listing_by_id(self):
        res = self.app.get('/listings/1')
        self.assertEqual(res.status_code, 200)

    # --- CART ---
    def test_get_cart(self):
        res = self.app.get('/cart/')
        self.assertEqual(res.status_code, 200)

    def test_add_to_cart(self):
        res = self.app.post('/cart/', json={'item': 1})
        self.assertEqual(res.status_code, 200)

    def test_add_to_cart_invalid(self):
        res = self.app.post('/cart/', json={})
        self.assertEqual(res.status_code, 200)

    def test_remove_from_cart(self):
        res = self.app.delete('/cart/1')
        self.assertEqual(res.status_code, 200)

    # --- PAYMENT ---
    def test_process_payment(self):
        res = self.app.post('/payment/process')
        self.assertEqual(res.status_code, 200)

    # --- REVIEW ---
    def test_get_reviews(self):
        res = self.app.get('/reviews/1')
        self.assertEqual(res.status_code, 200)

    def test_add_review(self):
        res = self.app.post('/reviews/1', json={'rating': 5, 'comment': 'Great!'})
        self.assertEqual(res.status_code, 200)

    def test_add_review_missing(self):
        res = self.app.post('/reviews/1', json={})
        self.assertEqual(res.status_code, 200)

    # --- WISHLIST ---
    def test_get_wishlist(self):
        res = self.app.get('/wishlist/')
        self.assertEqual(res.status_code, 200)

    def test_add_to_wishlist(self):
        res = self.app.post('/wishlist/1')
        self.assertEqual(res.status_code, 200)

    # --- RECOMMEND ---
    def test_get_recommendations(self):
        res = self.app.get('/recommendations/')
        self.assertEqual(res.status_code, 200)

    # --- STATIC PAGES ---
    def test_root_page(self):
        res = self.app.get('/')
        self.assertEqual(res.status_code, 200)

    def test_contact_page(self):
        res = self.app.get('/contact')
        self.assertEqual(res.status_code, 200)

if __name__ == '__main__':
    unittest.main()
