# Full-Stack Content Management System

This project is a complete, full-stack content management system (CMS) with a secure admin portal and a public-facing blog. It's built with a Next.js frontend and a Node.js/Express backend, using MongoDB as the database.

## Features

- **Secure Admin Portal**: A private, secure admin portal for managing content.
- **Full CRUD Functionality**: Create, read, update, and delete posts with a user-friendly interface.
- **Rich Content Creation**: Supports Markdown for content, as well as image and video embedding.
- **Tag Management**: Easily add and manage tags for each post.
- **Dynamic Frontend**: The public-facing blog is fully integrated with the backend, displaying content dynamically.
- **Search and Filtering**: The blog supports searching and filtering by tags.
- **Responsive Design**: Both the admin portal and the blog are fully responsive and work on all devices.
- **API Testing**: The backend API is covered by a suite of tests to ensure reliability.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install Dependencies

Install all the required dependencies for both the frontend and backend:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project by copying the example file:

```bash
cp .env.example .env
```

Now, open the `.env` file and fill in the required values:

- `MONGO_URI`: Your MongoDB connection string.
- `JWT_SECRET`: A secret key for generating authentication tokens.
- `ADMIN_USERNAME`: The desired username for the admin account.
- `ADMIN_PASSWORD`: A secure password for the admin account.

### 4. Seed the Database

With the environment variables configured, run the seed script to create the admin user in the database:

```bash
npm run seed
```

This will connect to your database and create the admin user with the credentials you provided.

### 5. Run the Application

You're now ready to run the application. The backend server and the Next.js frontend will run concurrently.

To start the development server, run:

```bash
npm run dev
```

This will start the backend server on port `5001` and the Next.js frontend on port `3000`.

- **Admin Portal**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Public Blog**: [http://localhost:3000/blog](http://localhost:3000/blog)

### 6. Run Tests

To run the backend API tests, use the following command:

```bash
npm run test
```

This will run all the tests and ensure that the backend is functioning correctly.