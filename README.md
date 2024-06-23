# MERN Stack Web Development

This repository contains the codebase for a MERN (MongoDB, Express, React, Node.js) stack web application. This project includes a complete backend API and a frontend user interface.

## Table of Contents

- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [License](#license)

## Installation

To get started with this project, follow the instructions below:

### Required Packages

```bash
npm init
npm install express dotenv nodemon mongoose bcrypt body-parser joi jsonwebtoken express-fileupload multer react-router-dom cors react-toastify
```

## Backend Setup

### Initial Setup

1. Create a folder named `backend` and open it in VS Code.
2. Initialize npm:
    ```bash
    npm init
    ```
3. Create an `index.js` file in the root and set up the basic Express server:
    ```javascript
    const express = require('express');
    const app = express();

    app.get('/', (req, res) => {
        res.send('Hello MERN!');
    });

    const port = 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
    ```

4. Install the required packages:
    ```bash
    npm install express dotenv nodemon
    ```

5. Create a `.env` file in the root with the following content:
    ```
    PORT=3000
    ```

6. Set up Nodemon for automatic server restarts:
    ```bash
    npm install --save-dev nodemon
    ```

7. Create the necessary folders in the root:
    - controllers
    - helpers
    - middlewares
    - models
    - routes

8. Install Mongoose for database connectivity:
    ```bash
    npm install mongoose
    ```

### Database Connection

Set up the database connection using Mongoose:

```javascript
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Connected to DB');
    })
    .catch((error) => {
        console.log('Error connecting to DB:', error);
    });
```

### API Routes

Refer to the detailed documentation for setting up various API routes. Below are some examples:

#### User Signup API

1. Install bcrypt:
    ```bash
    npm install bcrypt
    ```
2. Create `user.js` in the controllers folder and define the signup function.
3. Set up routes in the `routes` folder and import them in `index.js`.

#### Product API

1. Create `product.js` in the controllers folder and define the product functions.
2. Set up routes in the `routes` folder and import them in `index.js`.

## Frontend Setup

1. Create the React app inside a `frontend` folder:
    ```bash
    npx create-react-app frontend
    ```

2. Install necessary libraries:
    ```bash
    npm install react-router-dom axios react-toastify
    ```

3. Create a `.env` file in the `frontend` root directory.

### Folder Structure

- Create `pages` for all the pages.
- Create `components` and `modules` folders inside `src`.

### Sample Page

Create a sample `Home.js` file inside `pages`:

```javascript
import React from 'react';

function Home() {
    return (
        <div>
            <h1>Welcome to the MERN Stack Application</h1>
        </div>
    );
}

export default Home;
```

### Setting up Routes

Update `App.js` to include routes:

```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
            </Switch>
        </Router>
    );
}

export default App;
```

## API Documentation

### Testing APIs with Postman

- Create a workspace in Postman.
- Test each endpoint as specified in the documentation.

### Sample API Endpoints

- **Signup API:** `POST /api/user/signup`
- **Login API:** `POST /api/user/login`
- **Get User Info:** `GET /api/user/info`
- **Product API:** `GET /api/products`

## Testing

### Frontend Testing

- **Jest:** Used for testing React applications.
- **Mocha:** Used for backend testing.
- **Chai:** Assertion library for Node.js.
- **Supertest:** Library for testing HTTP servers.

## License

This project is licensed under the MIT License.

---

This README provides a high-level overview and basic setup instructions for the MERN stack application. For detailed information, refer to the full documentation.
