# share-youtube-video

## 1. Introduction

This project is a web application that allows users to register, login, share YouTube videos, and view a list of shared videos. One of the key features of the application is real-time notifications for new video shares. When a user shares a new video, other logged-in users will receive a real-time notification about the newly shared video. These notifications can be displayed as pop-ups or banners within the application and contain the video title and the name of the user who shared it.

## 2. Prerequisites

Before getting started, ensure that you have the following software and tools installed:

- Node.js (version 14.0.0 or later)
- NPM or Yarn
- MongoDB
- Docker

Make sure you have them available on your machine, try running the following command.

```bash
yarn -v && node -v
# or
npm -v && node -v
```

## 3. Installation & Configuration

### Clone the repository to local machine:

```bash
git clone git@github.com:haiduongdana/share-youtube-video.git
# or
git clone https://github.com/haiduongdana/share-youtube-video.git
```

### Navigate to the project directory:

```bash
cd share-youtube-video
```

## 4. Setup source back-end

### Navigate to back-end directory:

```bash
cd syv-be/
```

### Install dependencies:

```bash
npm install
# or
yarn install
```

### Create environment file:

```bash
cp .env.sample .env
```

Enter the .env variable:

```
NODE_ENV = dev

MONGO_URL_DEV = `url database setup in pre-step`
PORT_DEV = 8080
CLIENT_URL_DEV = http://localhost:3000
JWT_SECRET_DEV = <The jwt secret key>

MONGO_URL_PRODUCT = ''
PORT_PRODUCT = ''
CLIENT_URL_PRODUCT = ''
JWT_SECRET_PRODUCT = ''

JWT_LIFETIME = 1d
SESSION_SECRET = <The jwt secret key>

LOG_FILE = access.log
ACCESS_LOG_STREAM_INTERVAL = 1d

DEFAULT_PHOTO = default-photo.png

```

### Running the Application

To start the development server and access the application in a web browser, follow these steps:

```bash
npm run dev
# or
yarn dev
```

### Docker Deployment

If you prefer to deploy the application using Docker, follow these instructions:

#### a. Build the Docker image:

```bash
npm run docker-build
# or
yarn docker-build
```

#### b. Run the Docker container:

```bash
npm run docker-run
# or
yarn docker-run
```

### Usage

Note: Assuming PORT_DEV = 8080

### a. Authentication API:

- Signup API. URL: http://localhost:8080/api/auth/signup

- Login API. URL: http://localhost:8080/api/auth/login

- Logout API. URL: http://localhost:8080/api/auth/logout

- Generate access token via refresh token API. URL: http://localhost:8080/api/auth/refresh

### b. Video API:

- Sharing YouTube videos API. URL: http://localhost:8080/api/video/add

- Viewing a list of shared videos:

  - Get my shared videos API: http://localhost:8080/api/video/user/videos

  - Get all shared videos API: http://localhost:8080/api/video

- Viewing a video API: http://localhost:8080/api/video/:id

### Troubleshooting

If you encounter any issues during setup or usage of the application, try the following troubleshooting steps:

- Issue: Server fails to start or displays errors related to missing dependencies.
  - Solution: Ensure that you have installed all the necessary dependencies and have followed the installation and configuration steps correctly.
- Issue: Real-time notifications are not working.
  - Solution: Check the configuration settings related to real-time notifications and ensure that the necessary dependencies are properly installed. Verify that the server is capable of handling real-time communication.
- Issue: Problems with the database connection.
  - Solution: Double-check the database configuration settings and ensure that the database server is running properly. Verify the connection details such as host, port, username, and password.

## 5. Setup source front-end

### Navigate to front-end directory:

```bash
cd syv-fe/
```

### Install dependencies:

```bash
npm install
# or
yarn install
```

### Create environment file:

```bash
cp .env.sample .env
```

Enter the .env variable:

```
NEXT_PUBLIC_BASE_URL = ''
NEXT_PUBLIC_YOUTUBE_API_URL = ''
NEXT_PUBLIC_YOUTUBE_API_KEY = ''
NEXT_PUBLIC_SERVER_URL = ''

```

### Running the Application

To start the development application and access the application in a web browser, follow these steps:

```bash
npm run dev
# or
yarn dev
```

### Docker Deployment

If you prefer to deploy the application using Docker, follow these instructions:

#### a. Build the Docker image:

```bash
npm run docker-build
# or
yarn docker-build
```

#### b. Run the Docker container:

```bash
npm run docker-run
# or
yarn docker-run
```

### Usage

To use the application, follow these steps:

- Register a new user account or log in with an existing account.

- Once logged in, you can share YouTube videos by providing the video URL.

- You can view a list of shared videos on the application's main page.

- Real-time notifications will automatically appear whenever a new video is shared by another user.

To check unit test and component demo, follow these steps:

- Run storybook:

```bash
npm run storybook
# or
yarn storybook
```

- Open your web browser and navigate to [http://localhost:6006](http://localhost:6006) to access the application.
- In each component, navigate to Interactions tap to view unit test

### Troubleshooting

If you encounter any issues during setup or usage of the application, try the following troubleshooting steps:

- Issue: Application fails to start or displays errors related to missing dependencies.
  - Solution: Ensure that you have installed all the necessary dependencies and have followed the installation and configuration steps correctly.
- Issue: Real-time notifications are not working.
  - Solution: Check the configuration settings related to real-time notifications and ensure that the necessary dependencies are properly installed. Verify that the server is capable of handling real-time communication.
