# 🚗 Project Legacy

**The marketplace for automotive archeology.** Project Legacy is a full-stack platform dedicated to the rediscovery and sale of classic "barnyard find" cars.

## 🛠️ Tech Stack
* **Frontend:** Next.js 14 (App Router), Tailwind CSS 4, Lucide Icons.
* **Backend:** Django REST Framework.
* **Database:** PostgreSQL (Production), SQLite (Development).
* **Maps:** Leaflet.js for geospatial vehicle discovery.
* **Authentication:** JWT (JSON Web Tokens).

## ✨ Key Features
* **Interactive Map:** Visualize vehicle locations globally using Leaflet.
* **State-Driven UI:** Profile management with "Snapshot" undo logic for data integrity.
* **Mobile-First Design:** Custom mobile header and bottom navigation for field use.
* **Seller Workflow:** Conditional access to listing forms based on user `is_host` status.

## 🚀 Installation & Setup

### Backend (Django)
1. Navigate to backend folder.
2. Create virtual environment: `python -m venv venv`.
3. Install requirements: `pip install -r requirements.txt`.
4. Run migrations: `python manage.py migrate`.
5. Start server: `python manage.py runserver`.

### Frontend (Next.js)
1. Navigate to frontend folder.
2. Install packages: `npm install`.
3. Start development server: `npm run dev`.