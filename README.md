# 🚨 Notification Service

A Node.js microservice for sending notifications via ✉️ Email, 📱 SMS, and 📨 In-App messages, powered by RabbitMQ for queueing and MongoDB for persistence.

---

## 🚀 Features

- ✉️ **Send notifications** to users via Email, SMS, or In-App
- 🐇 **Queue-based processing** using RabbitMQ for scalability & reliability
- 🔁 **Automatic retries** for failed notifications (up to 3 attempts)
- 🛣️ **API Endpoints** for sending and retrieving notifications
- 📝 **Structured logging** to file and console
- ⚙️ **Environment-based configuration** for credentials and services

---

## 📁 Project Structure

<pre>
├── db.js # MongoDB connection and Notification model
├── index.js # Express API server, queue producer
├── logger.js # Custom logger (file + console)
├── package.json
├── senders.js # Email/SMS/In-app senders
├── worker.js # Queue consumer/worker
├── .env.example # Sample environment config
└── README.md
</pre>

---

## 📋 Assignment Requirements & Solution Mapping

| Requirement                                    | Implemented? | Details                               |
|------------------------------------------------|--------------|---------------------------------------|
| POST /notifications                            | ✅           | Enqueues notification for processing  |
| GET /users/{id}/notifications                  | ✅           | Fetches all notifications for a user  |
| Email, SMS, In-App notification types          | ✅           | Real email/SMS, DB for in-app         |
| Use queue (RabbitMQ) for processing            | ✅           | Producer/worker architecture          |
| Retries for failed notifications               | ✅           | 3 attempts with status tracking       |

---

## 🛠 Tech Stack

- 🟢 **Node.js** & **Express.js**
- 🍃 **MongoDB** (Mongoose)
- 🐇 **RabbitMQ** (amqplib)
- ✉️ **Nodemailer** (Gmail SMTP)
- 📲 **Twilio** (SMS)
- 🔑 **dotenv** (Environment config)
- 🗓️ **date-fns** (Date formatting)
- 🪵 **Winston** (Logging)
- 📝 **Custom logger** (logs to file and console)

---

## ⚡ Prerequisites

Before you begin, ensure you have the following:

- Node.js (v14 or higher)
- MongoDB (local or Atlas cluster)
- RabbitMQ (local or CloudAMQP)
- Twilio account (for SMS)
- Gmail account (for email)

---

## 🏁 Setup Instructions

1. **Clone the repository**
    ```
    git clone [your-repository-url]
    cd notification-service
    ```

2. **Install dependencies**
    ```
    npm install
    ```

3. **Environment Configuration**  
   Create a `.env` file in the root directory with the following variables:
    ```
    MONGODB_URI=mongodb://localhost:27017/notifications
    RABBITMQ_URL=amqp://localhost
    EMAIL_USER=your@gmail.com
    EMAIL_PASS=your-gmail-app-password
    TWILIO_SID=your-twilio-account-sid
    TWILIO_AUTH=your-twilio-auth-token
    TWILIO_PHONE=+1234567890
    ```

4. **Start the services**  
   Start the API server:
    ```
    node index.js
    ```
   Start the worker (in a separate terminal):
    ```
    node worker.js
    ```
   The API will be available at [http://localhost:3000](http://localhost:3000)
   
---

## 📡 API Endpoints

### ➕ Create a notification

**POST** `/notifications`

**Body:**
<pre>
{
"userId": "user@example.com", // or phone number for SMS
"type": "email", // or "sms", "in-app"
"message": "Your notification message"
}
</pre>

### 📥 Get user notifications

**GET** `/users/:id/notifications`

---

## 📝 Assumptions

- **User Identification:**
  - For email notifications, `userId` is assumed to be an email address.
  - For SMS notifications, `userId` is assumed to be a phone number in E.164 format.

- **Environment:**
  - RabbitMQ is running locally on default port (5672).
  - MongoDB is running locally on default port (27017).
  - For production, you should use cloud services (MongoDB Atlas, CloudAMQP).

- **Authentication:**
  - The service currently has no authentication layer (assumes this will be handled by an API gateway in production).

- **Email Provider:**
  - Uses Gmail SMTP with app passwords (recommend using a dedicated email service like SendGrid for production).

- **SMS Provider:**
  - Uses Twilio (requires a Twilio account with SMS capabilities).

---

## 🌐 Live Deployment

Access the deployed API here:

🔗 **[https://pepsaleassignment-production.up.railway.app](https://pepsaleassignment-production.up.railway.app)**

## 📌 How to Use the API (Deployed)

### ✅ Create a Notification

**POST** `/notifications`  
URL:  
`https://pepsaleassignment-production.up.railway.app/notifications`

**Request Body (for Email):**
<pre>json
{
  "userId": "test@example.com",
  "type": "email",
  "message": "This is an email notification"
}</pre>

**Request Body (for SMS):**
<pre>json
{
  "userId": "+91xxxxxxxxx", // I am using a free account so notifications can be sent to only verfied numbers in my twilio account.It won't work for any other numbers.Use this number (+918340150160) for testing purpose.
  "type": "sms",
  "message": "This is an SMS notification"
}</pre>

**Request Body (for in-app):**
<pre>json
{
  "userId": "user123",
  "type": "in-app",
  "message": "This is an in-app notification"
}</pre>

### 📥 Get User Notifications
GET `/users/:id/notifications`
Example:

For email:
<pre>https://pepsaleassignment-production.up.railway.app/users/test@example.com/notifications</pre>

For SMS (phone):
<pre>https://pepsaleassignment-production.up.railway.app/users/+91xxxxxxxxxx/notifications</pre>

For In-App (user ID):
<pre>https://pepsaleassignment-production.up.railway.app/users/user123/notifications</pre>

---

## 🧪 Testing

To test the service:

- Start both the API server and worker.
- Send a POST request to create a notification.
- Check the logs to verify the notification was processed.
- Use the GET endpoint to retrieve notification history.

Example:
<pre>
curl -X POST -H "Content-Type: application/json" -d '{
"userId": "test@example.com",
"type": "email",
"message": "Test notification"
}' http://localhost:3000/notifications
</pre>

---

## 🚨 Error Handling & Retries

- If a notification fails to send, it is retried up to 3 times.
- After 3 failures, the notification status is set to "failed" in MongoDB.

---

## 🛠️ Troubleshooting

- **Email not sending:** Verify your Gmail app password is correct and less secure apps are allowed.
- **SMS not sending:** Check your Twilio credentials and phone number format.
- **Queue not processing:** Ensure RabbitMQ is running and the worker is started.
- **Database issues:** Verify MongoDB connection string and that the service is running.

---

## 🚀 Deployment Guide

Instructions for deploying to Render, Railway, or Heroku will be provided in the project documentation.

---

**🎉 Happy notifying! 🚀**
