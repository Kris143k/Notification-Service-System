# Notification Service

A Node.js microservice for sending notifications via email, SMS, and in-app messages using RabbitMQ for queueing and MongoDB for persistence.

---

## Features

- Send notifications through multiple channels (email, SMS, in-app)
- Queue system using RabbitMQ for reliable delivery
- MongoDB storage for notification history
- Retry mechanism for failed notifications
- API endpoints for creating and retrieving notifications

---

## Prerequisites

Before you begin, ensure you have the following:

- Node.js (v14 or higher)
- MongoDB (local or Atlas cluster)
- RabbitMQ (local or CloudAMQP)
- Twilio account (for SMS)
- Gmail account (for email)

---

## Setup Instructions

1. **Clone the repository**
<pre>git clone [your-repository-url]
cd notification-service</pre>

2. **Install dependencies**
<pre>npm install</pre>

3. **Environment Configuration**
Create a `.env` file in the root directory with the following variables:
<pre>MONGODB_URI=mongodb://localhost:27017/notifications
RABBITMQ_URL=amqp://localhost
EMAIL_USER=your@gmail.com
EMAIL_PASS=your-gmail-app-password
TWILIO_SID=your-twilio-account-sid
TWILIO_AUTH=your-twilio-auth-token
TWILIO_PHONE=+1234567890</pre>

4. **Start the services**
Start the API server:
<pre>node index.js</pre>
Start the worker (in a separate terminal):
<pre>node worker.js</pre>
The API will be available at [http://localhost:3000](http://localhost:3000)
---

## API Endpoints

### Create a notification

**POST** `/notifications`

**Body:**
<pre>
{
"userId": "user@example.com", // or phone number for SMS
"type": "email", // or "sms", "in-app"
"message": "Your notification message"
}
</pre>

### Get user notifications

**GET** `/users/:id/notifications`

---

## Assumptions

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

## Deployment

See the Deployment Guide section below for instructions on deploying to Render, Railway, or Heroku.

---

## Testing

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

## Troubleshooting

- **Email not sending:** Verify your Gmail app password is correct and less secure apps are allowed.
- **SMS not sending:** Check your Twilio credentials and phone number format.
- **Queue not processing:** Ensure RabbitMQ is running and the worker is started.
- **Database issues:** Verify MongoDB connection string and that the service is running.

---

## Deployment Guide

Instructions for deploying to Render, Railway, or Heroku will be provided in the project documentation.

---

**Happy notifying!**
