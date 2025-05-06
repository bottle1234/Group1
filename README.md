
# 🏠 StayBnb

A full-stack Airbnb-inspired web application that allows users to sign up, log in, browse listings, make bookings, and more.

---

## 🚀 Project Features

- 🔐 User authentication (signup + login)
- 🏡 Create and view property listings
- 📅 Make and cancel bookings
- 📨 Contact form
- 🧪 Backend unit testing
- 💅 Styled using Tailwind CSS
- ⚡ Frontend powered by React + TypeScript + Vite
- 🧠 Backend built with FastAPI (Python)

---

## 📁 Project Structure

```
Group1-final/
├── websitePackage/         # Frontend (React + Vite)
├── staybnb-backend/        # Backend (FastAPI - Python)
├── test_main.py            # Backend tests using unittest
└── test_results.txt        # Exported test output
```

---

## 🛠 Installation

### 1. Clone the project
```bash
git clone https://github.com/your-repo/StayBnb.git
cd Group1-final
```

---

## 🌐 Frontend Setup (React)

```bash
cd websitePackage
npm install
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🐍 Backend Setup (FastAPI)

```bash
cd staybnb-backend
pip install fastapi uvicorn
uvicorn main:app --reload
```

API runs at: [http://localhost:8000](http://localhost:8000)

Swagger Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## ✅ Running Tests

```bash
python test_main.py
```

To save results to a file:
```bash
# Inside test_main.py
# Output will be written to test_results.txt
```

---

## ✨ Future Improvements

- Stripe integration for real payments
- Image upload to cloud (Cloudinary/S3)
- Persistent database (PostgreSQL or MongoDB)
- Responsive mobile design
