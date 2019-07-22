# offix-example-react

Demo application that reimplements pieces of the [`aerogear/ionic-showcase`](https://github.com/aerogear) app but using react and [Offix](https://github.com/aerogear/offix)

## Getting Started

### Launching the Server

Follow the guide in the [`ionic-showcase readme`](https://github.com/aerogear) to start the server.

### Launching the App

Install Dependencies

```
npm install -g @ionic
```

Start the app

```
npm start
```

Navigate to the 'Manage Tasks' Screen.

Currently, the only things that work are

* Subscriptions - Go to the graphql playground on the server and perform some crud operations and you will see the updates happening
* Deletions - The button on the far right is a delete button (For some reason ionicons sometimes render but sometimes they don't 😔)