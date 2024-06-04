# Repair Shop Store API

An API for a repair shop store designed to replace the old system of using sticky notes. This API is built using Node.js and Express, and it leverages several key dependencies to ensure efficient and secure operations.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- The application supports multiple users, enabling team-based workflows and real-time collaboration.
- User authentication with JWT
- Secure password handling with bcrypt
- Rate limiting to prevent abuse
- CORS support for cross-origin requests
- Environment variable management with dotenv
- Data management with MongoDB and Mongoose
- UUID generation for unique identifiers
- Date handling with date-fns

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose

## Dependencies

```json
{
  "bcrypt": "^5.1.1",
  "cookie-parser": "^1.4.6",
  "cors": "^2.8.5",
  "date-fns": "^3.0.6",
  "dotenv": "^16.3.1",
  "express": "^4.18.2",
  "express-async-errors": "^3.1.1",
  "express-rate-limit": "^7.1.5",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^6.5.0",
  "mongoose-sequence": "^6.0.0",
  "uuid": "^9.0.1"
}
```

### Dev Dependencies

```json
{
  "nodemon": "^3.0.2"
}
```

## Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/HAWKZ4/Notes_Repair_Shop_API
    ```

2. Navigate to the project directory:
    ```sh
    cd Notes_Repair_Shop_API
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```

4. Create a `.env` file in the root directory and add your environment variables:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

5. Start the development server:
    ```sh
    npm run dev
    ```

## API Endpoints

  - Register a new user
  - Login a user
  - Get all users
  - Get user by ID
  - Create a new repair request
  - Get all repair requests
  - Get repair request by ID
  - Update repair request
  - Delete repair request

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or suggestions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

Feel free to modify or expand this template to better suit your project's specifics.
