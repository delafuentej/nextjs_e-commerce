# 🛍️ E-Commerce Fashion Store

Welcome to **E-Commerce Fashion Store** — a modern online clothing store featuring an admin dashboard, user authentication, and PayPal payment integration.

## 🖼️ Preview

<img src="./public/gif/eshop.gif" alt="App Preview" style="width:800px;" />

---

## ✨ Key Features

- 👤 Customer registration and login
- Search for articles by words
- Sorting of items by gender and size availability
- Modification of shipping data
- 🛒 Persistent shopping cart
- 📦 Order management/Check out
- 💳 PayPal payment integration

- 🛠️ **Admin Dashboard**:
  - Create/Edit products
  - Payments confirmations.
  - Manage orders and users
- 🛡️ Security
  - Passwords are hashed using bcryptjs
  - Route protection via NextAuth and middleware
  - Input validation with Zod

---

## ⚙️ Technologies Used

- **Framework**: Next.js 14
- **Database & ORM**: Prisma ORM + PostgreSQL _(or your DB of choice)_
- **Authentication**: NextAuth.js (v5)
- **Validation**: Zod
- **Global state**: Zustand
- **Styling**: Tailwind CSS
- **Containerization**: Docker + Docker Compose

## 🚀 How to Run This Project

1. Clone the repository.
2. Create a copy of the file `.env.template` and rename it to `.env`, and modify the environmet variables.
3. Install dependencies: `npm install`
4. Launch the DB: `docker compose up -d`
5. Run prisma's migrations: `npx prisma migrate dev`
6. Execute command SEED `npm run seed`
7. Launch the application: `npm run dev`
