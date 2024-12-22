# url-store

A new way to save your favorite and more important URLs.

## Description

`url-store` is a personal library for organizing and managing your favorite links. It allows users to create topics, add links to those topics, and manage them through a web interface. The backend is built with Node.js, Express, and MongoDB, while the frontend is a simple HTML/CSS/JavaScript application.

## Features

- User authentication (registration and login)
- Create, read, update, and delete topics
- Add, view, and delete links within topics
- Responsive web interface

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/url-store.git
    cd url-store
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a [.env](http://_vscodecontentref_/1) file in the root directory and add the following environment variables:
    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/url-store
    JWT_SECRET=your-secret-key
    ```

4. Start the development server:
    ```sh
    npm run dev
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.

2. Register a new user account or log in with an existing account.

3. Create new topics and add links to those topics using the web interface.

4. Manage your topics and links as needed.

## Running Tests

To run the unit tests for the backend controllers, use the following command:
```sh
npm run test
```
This will execute the tests and provide feedback on whether the functions in the `topicsController` and `linksController` are working as expected.

To run the MongoDB operations tests, use the following command:
```sh
node db/tests/testMongoDB.js
```

## License
This project is licensed under the MIT License.