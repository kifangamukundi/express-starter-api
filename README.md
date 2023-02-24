# Express Js Starter API

This includes the basis setup that one can build on: The api includes registration and confirmation of the same; it also includes login endpoints; and finally forgot password and reset password with ability to send the reset links.

The set up also includes the Mpesa Stk push capability; whereby given a phone number and amount; the endpoint can initiate a payment on the customer's phone.

All in all this is a full authentication system using jwt (json web token).

For mail sending of localhost; you can use the mailhog client for testing if the application works as expected. 

NOTE: for mailhog you only need to specify the host (localhost) and port (1025)


# Configuration :
Create a ```config.env``` file in the root directory and fill it with the following informations :

```
PORT=5000

DATABASE_CONNECTION=""

JWT_SECRET=""
JWT_EXPIRE="10min"

ACCESS_SECRET=""
ACCESS_EXPIRE="10min"

REFRESH_SECRET="refresh"
REFRESH_EXPIRE="2s"

#For password Reset For live application

EMAIL_SERVICE=""
EMAIL_USERNAME=""
EMAIL_PASSWORD=""
EMAIL_FROM=""

FRONT_END=""

COMPANY_NAME=""
COMPANY_SUPPORT_EMAIL=""
COMPANY_SUPPORT_PHONE=""

PASSWORD_RESET_TIME="24 hours"

# Mpesa stk push credentials
MPESA_CONSUMER_KEY=""
MPESA_CONSUMER_SECRET=""
MPESA_PASSKEY=""

MPESA_ENDPOINT=""
AUTH_ENDPOINT=""

# Has to be online url
MPESA_CALLBACK_URL=""
MPESA_BUSINESS_SHORTCODE=174379

```

# Quick Start :
```Javascript
// Install dependencies
npm install || yarn install

// Run server
npm run server

```