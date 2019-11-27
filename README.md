# Trivia React app

## Getting Setup

> _tip_: this frontend is designed to work with [Flask-based Backend](../backend). It is recommended you stand up the backend first, test using Postman or curl, update the endpoints in the frontend, and then the frontend should integrate smoothly.


For this app an additional server for authentication under server.js it includes an API endpoint `/api/external` has been included in the Express server that requires a bearer token to be supplied as a bearer token in the `Authorization` header (as provided during the authentication flow). This uses the [`express-jwt`](https://github.com/auth0/express-jwt) middleware to validate the token against the identifier of your API as set up in the Auth0 dashboard, as well as checking that the signature is valid.

## Project setup

Use `yarn` or `npm` to install the project dependencies:

```bash
# Using npm..
npm install

# Using yarn..
yarn install
```
### Auth 0 Explanation 

## What is Auth0?

Auth0 helps you to:

- Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, among others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
- Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
- Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
- Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
- Analytics of how, when and where users are logging in.
- Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Auth0 Rule to Set Roles to a User

```js
function (user, context, callback) {
  user.app_metadata = user.app_metadata || {};

  if (user.email === 'bruno.krebs@auth0.com') {
    user.app_metadata.role = 'admin';
  } else {
    user.app_metadata.role = 'writer';
  }

  auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
    .then(() => {
      context.idToken['https://itaditya/role'] = user.app_metadata.role;
      callback(null, user, context);
    })
    .catch((err) => {
      callback(err);
    });
}
```














## Create a Free Auth0 Account

1. Go to [Auth0](https://auth0.com/signup) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.
### Configuration

The project needs to be configured with your Auth0 domain and client ID in order for the authentication flow to work.

To do this replace the values in the folder called `src/auth_config.json' with your own Auth0 application credentials:

```json
{
  "domain": "{YOUR AUTH0 DOMAIN}",
  "clientId": "{YOUR AUTH0 CLIENT ID}",
  "audience": "{YOUR AUTH0 API_IDENTIFIER}"
}
```


## Front End Trivia App Functions

The frontend should be fairly straightforward and disgestible. The user is assigned two main roles with specific functions in their url and will be shown at the Nav Bar according to their roles :

### Admin
```bash 
role : admin  
url : 
- /addview (abliity to add new questions)
- /editquestion (abliity to update questions informations)
- / (root open to public but this role allows for delete of questions)
```
### Writer

```bash 
role : Writer  
functions : 
- /quizview (abliity to play trivia)
- /editquestion (abliity to update questions informations)
```

### Public

```bash 
role : public  
functions : 
- / (root site of the app and can view all questions)
- / (search functions in this root url is open to all)
- / (group by categories when clicking on the categories by the side bar is allowed only when authenticated.)
```


## Development and Deployment

### Compiles and hot-reloads for development

This compiles and serves the React app, and starts the Auth API server on port 3001. Calls to `http://localhost:3000/api/*` routes will be proxied through to the backend:

```bash
npm run dev
```

### Compiles and minifies for production

```bash
npm run build
```

### Docker build

To build and run the Docker image, run `exec.sh`, or `exec.ps1` on Windows.
 
### Demo

Demo app is hosted at 

```bash
https://triviafrontend.herokuapp.com/
```

 





