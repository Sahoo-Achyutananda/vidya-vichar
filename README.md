````markdown
# 📌 Backend – Vidya Vichar

The backend is built with Node.js, Express, MongoDB (Mongoose) and runs on port 5000.  
It handles user authentication, group management, and Q&A features.  


## 🚀 Setup & Run
cd backend
npm install
npm run dev
````

The server starts on **[http://localhost:5000](http://localhost:5000)**.

---

## 🔑 Authentication Routes (`/api/users`)

### 1. Register User

**POST** `/api/users/register`

* **Request Body**

```json
{
  "username": "john123",
  "email": "john@example.com",
  "password": "mypassword"
}
```

* **Response**

```json
{
  "message": "User registered successfully",
  "user": { "id": "...", "username": "john123", "email": "john@example.com" }
}
```

### 2. Login User

**POST** `/api/users/login`

* **Request Body**

```json
{
  "email": "john@example.com",
  "password": "mypassword"
}
```

* **Response**

```json
{
  "message": "Login successful",
  "user": { "id": "...", "username": "john123", "email": "john@example.com" }
}
```

### 3. User Profile

**GET** `/api/users/profile` (🔒 Protected)

* **Response**

```json
{
  "_id": "...",
  "username": "john123",
  "email": "john@example.com",
  "created_classes": [  ],
  "joined_classes": [  ]
}
```

---

## 👥 Group Routes (`/api/groups`)

### 1. Create Group

**POST** `/api/groups/create` (🔒 Protected)

* **Request Body**

```json
{ "groupname": "Math Class" }
```

* **Response**

```json
{ "message": "Group created", "group": {  } }
```

### 2. Join Group

**POST** `/api/groups/join` (🔒 Protected)

* **Request Body**

```json
{ "accesscode": "123456" }
```

* **Response**

```json
{ "message": "Joined successfully", "groupid": "..." }
```

### 3. Get All Groups

**GET** `/api/groups/all` (🔒 Protected)

* **Response**

```json
{
  "groups": [
    { "id": "...", "groupName": "...", "faculty": "...", "createdAt": "..." }
  ]
}
```

### 4. User’s Groups

**GET** `/api/groups` (🔒 Protected)

* **Response**

```json
{
  "created_classes": [  ],
  "joined_classes": [  ]
}
```

### 5. Filter Groups by Status

**POST** `/api/groups` (🔒 Protected)

* **Request Body**

```json
{ "status": "active" }
```

* **Response**
  Groups matching status.

### 6. Change Group Status

**PUT** `/api/groups/:groupid` (🔒 Protected, faculty only)

* **Request Body**

```json
{ "status": "inactive" }
```

* **Response**

```json
{ "message": "status changed successfully" }
```

### 7. Get Questions in Group

**GET** `/api/groups/:groupid` (🔒 Protected)

* Returns all questions in a group.

### 8. Post Question in Group

**POST** `/api/groups/:groupid` (🔒 Protected)

* **Request Body**

```json
{ "question": "What is polymorphism?" }
```

* **Response**

```json
{
  "message": "Question added successfully",
  "questionid": "...",
  "author": "john123",
  "questionText": "What is polymorphism?",
  "status": "unanswered",
  "important": "no"
}
```

### 9. Update Question

**PUT** `/api/groups/:groupid/questions/:questionid` (🔒 Protected)

* **Request Body**

```json
{ "status": "answered", "important": "yes" }
```

* **Response**

```json
{ "message": "Question updated successfully" }
```

### 10. Delete Question

**DELETE** `/api/groups/:groupid/questions/:questionid` (🔒 Protected, faculty only)

* **Response**

```json
{ "message": "Question deleted successfully" }
```

### 11. Get User Role in Group

**GET** `/api/groups/:classId/role` (🔒 Protected)

* **Response**

```json
{ "role": "instructor" } 
```