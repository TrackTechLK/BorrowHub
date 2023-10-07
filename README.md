# BorrowHub

## Introduction

The project is an item sharing application. A user will be able to join or form communities based on their various interests and share items within communities. A good example would be avid readers. A community of readers would be able to share books among themselves while easily keeping track of their items while also requesting books from other users. 

## Project Overview

### Frontend (React.js)

#### User Interface
The frontend of the application is built using React.js and React Admin, popular JavaScript libraries for creating interactive user interfaces. The user interface is designed to be intuitive and easy to navigate. It provides various features and functionalities that allow users to interact with the system seamlessly.

#### Features
1. **User Authentication:** Users can register, login, and securely manage their accounts. Proper authentication mechanisms are implemented to ensure data security.

2. **Account Overview:** Users can view their account details, including previous interactions, pending item sharing, commnuity updates and item requests.

3. **Sharing and Profile Management:** Users can perform various operations, such as request items, share items, keep track of shared items, and profile management.

5. **Toxicity Screening:** Rude and unethical comments and text are prevented from being entered with the help of Tensorflow.js libraries.

![Customer](Customer.png)
![Manager](Manager.png)
![Details](Details.png)

### Backend (Node.js)

#### Server and APIs
The backend of the system is built using django. It serves as the bridge between the frontend and the database, handling user requests and providing data from the database.

#### Features
1. **API Endpoints:** The backend defines a set of RESTful API endpoints with the help of Django REST framework to handle various user interactions and operations, such as authentication, transactions, and account management.

2. **Database Integration:** Django interacts with the database with the use of its built in ORM system to retrieve and store user data, transactions, and more.

3. **Security:** Robust security measures, such as data encryption, input validation, and authentication, are implemented to protect user data and ensure the integrity of the system.

4. **Logging and Error Handling:** The backend logs activities and errors to facilitate debugging and monitoring of the system.

### Database (PostgreSQL)

#### Data Storage and Management
The PostgreSQL database stores and manages all the data necessary for BorrowHub. It is designed with a well-structured schema to efficiently organize information related to users, accounts, transactions, communities, and more.

## Contributors

<a href="https://github.com/TrackTechLK/BorrowHub/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=TrackTechLK/BorrowHub" />
</a>
