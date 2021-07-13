# TeamUp
TeamUp - A MERN Stack Chat and Video Conferencing Application. The application is built using WebRTC Library. Socket.io is used to establish real-time communication between the users. In addition to the MongoDB database, the app uses Redis-server DB as well, which is responsible for the storage of the meeting sessions data.

## Tech Stack 💻

- [React.js](https://reactjs.org/)
- [Netlify + Heroku (Hosting)](https://www.netlify.com/)
- [Web RTC](https://github.com/webrtc)
- [Socket.io](https://socket.io/)
- [Node.js](https://nodejs.org/en/)

## Features and Functionalities ✨

- Instantly join a video call with a code
- Option to Mute video
- In call chat option 
- Share your screen with the meeting members
- Chat in real-time with your friends
- Unlimited duration calls
- Simple and intuitive UI
- Register/Login on the App
- Retrieve previous chats

## Screenshots 📸
### Register Page
![enter image description here]![1](https://user-images.githubusercontent.com/56886360/125458040-d14d4611-686e-41fd-8572-ee8952147ea2.png)
### Login Page
![enter image description here](https://user-images.githubusercontent.com/56886360/125245756-8f68f600-e30e-11eb-82e4-cab7ecf019a4.png)
### Home Page
![enter image description here](https://user-images.githubusercontent.com/56886360/125245813-a3acf300-e30e-11eb-8e6d-442b3938ace8.png)
### Chat page
![enter image description here](https://user-images.githubusercontent.com/56886360/125245847-b0314b80-e30e-11eb-9d35-a7db4d0cc490.png)


## Getting started
### Pre-requisites
Before starting to work on this project, you must have Node.js installed on your machine.

### Quick start
Clone the project in your local system.
#### Server side Setup
- Navigate to the backend folder
- Create a .env file
```
PORT = 4000;
//Add your MongoDb connection string here
MONGO_URL=' ' 
//Add your RedisLab db host string here
REDIS_HOST=' '
//Add your RedisLab db port string here
REDIS_PORT=' '  
//Add your RedisLab db password here
REDIS_PASS=' '

```
- Install the dependencies for the backend 
``` 
# Install dependencies on the server side
npm install

# Run the backend server
npm start

```
#### Client side Setup
- Navigate to the client folder
- Install the dependencies for the Client side(React App)
```
# Install dependencies on the client side
npm install

#Run the client server
npm start
```
## Future Scope
- Video call with multiple members at a single time
- Group chat functionality
- Share location, files, images and voicenotes
- Schedule meetings and events.
- Introduce end-to-end encryption

### Video Demo Link 
***https://youtu.be/gxQLd3rTl6Q ***
