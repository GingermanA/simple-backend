# Simple Express Server

This is a simple Express server with endpoints to manage student data.

## Getting Started

1. Install NPM packages
   ```sh
   npm install
   ```
2. Start the server
   ```sh
   node server.js
   ```

## Endpoints

### 1. GET "/students/:id"

Retrieves information about a student with the specified ID.

### 2. POST "/students"

Creates a new student record.

### 3. DELETE "/students/:id"

Deletes the student record with the specified ID.

## Logging

Uses Morgan, a HTTP request logger middleware for node.js

## Testing

Uses Jest. Run the following command for testing.

```sh
npm test
```

## Dependency Injection

The server utilizes dependency injection for handling student data through the `studentService.js` module.

## Mock JSON Data

Mock JSON data for testing purposes is provided in the `students.js` file.
