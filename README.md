# YY_music_mobile

This repo contains both the frontend and backend of the YY-music mobile app.

This is a mobile app development, practice for comp333 in Wesleyan University. This is a training exercise.

## How to run the app

### Pre-requisites

Before you begin, ensure you have met the following requirements:

- XAMPP installed for running the backend local server.

- Node.js installed on your machine.
- npm (Node Package Manager) or Yarn installed.
- React Native environment set up. If you haven't set up your environment, follow the instructions [here](https://reactnative.dev/docs/environment-setup).
- An Android or iOS device/emulator for testing the app.

### Setting Up

1. Clone this repository into the htdocs folder if you're using XAMPP. (Ensure that the repo is in the directory that your local backend server can access.)

2. Navigate to the folder `YY_music_mobile` in your terminal.

3. Use the provided music_db.sql to set up your database. We have provided sample tables in this SQL, so you don't have to fill in song reviews by yourself.

### Installing Dependencies

- For the picker component, run

  ```bash
  npm install react-native-picker-select
  npm install --save victory-native
  ```

### Running the app

- Initialize your React Native project if you haven't already done so. You can create a new react native project with the Expo using:

  ```bash
  npx create-expo-app <YourProject>
  ```

- Navigate to your project folder:

  ```bash
  cd <YourProject>
  ```

- Make sure you have opened your XAMPP server and started the Apache and MySQL modules.

- Make sure you change the IP address to your backend server IP and change the file path to your backend path in every fetch code in the frontend.

  - You can also try directly using our original backend server location. If you are using Weslyan's eduroam network and our local server is still running, you may directly connect to our backend server.

  ```javascript
  const response = await fetch(
        // Make sure you change the IP address to your backend server IP,
        // and change the file path to your backend path
        "http://172.21.48.189/YY_Music_JS/backend/index.php?action=login"
        // The rest of the code
  ```

- Run the app:

  ```bash
  npm start
  ```

  **After setting up all this, you will be able to run our web locally!**\

## Additional Features

### The Search Function

- The user can search for specific songs, ratings, artists, categories, and users. The search function is implemented in the frontend.

## MVC architecture & REST API

Components Breakdown for Model and Controller:

    index.php:
    Role: Main entry point for our backend.
    Functionality: Receives incoming requests from the frontend. Based on the type of action requested and any associated data, it delegates the responsibility to the UserController for processing.

    BaseController.php:
    Role: Centralized response manager.
    Functionality: Takes output from the UserController, transforms it into a JSON format, and sends it back to the frontend.

    UserController.php:
    Role: Core logic handler.
    Functionality: Interprets commands and raw inputs provided by index.php. It coordinates with UserModel.php to execute queries and then routes the data back through the BaseController.

    bootstrap.php:
    Role: Initialization script.
    Functionality: Contains essential setup code required for the backend to operate.

    Database.php:
    Role: Database configuration manager.
    Functionality: Maintains fundamental details about the database, such as server information, host details, and provides the foundation for initiating database queries.

    UserModel.php:
    Role: Data interaction layer.
    Functionality: Executes database queries under instructions from the UserController, ensuring that data is accurately fetched, stored, updated, or deleted as per the request.

### Member Contribution

Harry Yu 50% Patton Yin 50%
