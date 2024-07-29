# Contact-List-React-App
Developed a Chat Application using React.

## Hosted Link:
### https://sinhakhushitherockc2.github.io/React_Chat_Application/

## Features:
* Signup using email, password and optionally add profile picture.
* Login using email and password.
* Search for friends.
* Search for messages inside chats.
* Send text ,emoji, images etc. to your friend.
* View your profile.

## Few Pre-existing users:
* Email- yor@email.com, Password-yor@forger
* Email- aaron@email.com, Password-aaron@password
* Email- oga@email.com, Password-oga@password

## Explanation Video:
https://youtu.be/9YZJ4TLXhWw

## Tools Used:
* React
* Context API
* React-Router-Dom
* Firestore Database
* Javascript
* CSS
* React-Toastify

## Folder Structure:
```bash
react-chat-application/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── assets/
│   │   └──images/
│   │       ├── BackgroundImage.jpg
│   │       └── eyeIcon.png
│   ├── components/
│   │   ├── LeftView/
│   │   │   ├── FriendList.jsx
│   │   │   ├── LeftView.module.css
│   │   │   ├── Navbar.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── SideBar.jsx
│   │   ├── RightView/
│   │   │   ├── ChatScren.jsx
│   │   │   ├── MessageBar.jsx
│   │   │   ├── MessageList.jsx
│   │   │   ├── NavigationBar.jsx
│   │   │   └── RightView.module.css
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ChatContext.module.css
│   │   ├── database/
│   │   │   └── firebaseInit.js
│   │   ├── pages/
│   │   │   ├── error
│   │   │   │     ├── NotFound.js
│   │   │   │     └── NotFound.module.css
│   │   │   └── userAuthentication
│   │   │         ├── SignUp.js
│   │   │         ├── SignIn.js
│   │   │         └── Authentication.module.css
│   │   ├──Home.js   
│   │   └──Profile.js
│   ├── App.js
│   ├── index.js
│   └── ...
├── .gitignore
├── package.json
├── README.md
└── ...
```

## Installation On Local Machine:
Follow these steps to get the project up and running on your local system:

1. Clone the repository to your local machine:
```bash
    https://github.com/SinhaKhushiTheRockc2/React_Chat_Application
```
2. Navigate to the root directory of the project:

3. Install all the dependencies:
```bash
    npm install
```
4. Start the development server
```bash 
    npm Start
```
5. Open your web browser and go to http://localhost:3000 to see the application in action.

