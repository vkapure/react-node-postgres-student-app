
# Student CRUD App (Vite + Node.js + PostgreSQL)

This is a full-stack application for managing student records using **Vite + React** on the frontend, **Node.js + Express** on the backend, and **PostgreSQL** as the database.

---

## 🚀 Features

- Create, Read, Update, Delete (CRUD) student records
- Assign multiple subject marks to a student
- Parent-child relationship using `parent_id`
- Server-side pagination
- Frontend search filter
- Bootstrap modal-based form for Add/Edit
- SweetAlert confirmation dialogs

---

## 🗂 Folder Structure

```
student-crud-project/
├── backend/                                 # Node.js + Express API
├── frontend/                                # Vite + React app
├── student_schema.sql                       # PostgreSQL schema
├── student_api_collection.postman_collection.json  # Postman API test collection
```

---

## ⚙️ Backend Setup (Node.js + PostgreSQL)

1. Go to the `backend` folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your PostgreSQL connection:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/yourdb
   ```

4. Run the SQL schema script to create tables:
   ```bash
   psql -U youruser -d yourdb -f ../student_schema.sql
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

---

## 💻 Frontend Setup (Vite + React)

1. Go to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend app:
   ```bash
   npm run dev
   ```

> Make sure your backend is running at `http://localhost:5000` and your frontend uses this URL for API calls.

---

## 🧪 API Testing with Postman

1. Open Postman
2. Import the collection: `student_api_collection.postman_collection.json`
3. Test:
   - Create Student
   - Get Students (paginated)
   - Get Student by ID
   - Update Student
   - Delete Student

---

## 🧰 Built With

- Vite + React
- Node.js + Express
- PostgreSQL
- Bootstrap 5
- SweetAlert2

---
