# The Shop App

## Initial Setup

For the initial setup, we started creating an App with expo init and installing some packages:

```bash
yarn add redux react-redux react-navigation react-navigation-header-buttons react-navigation-drawer react-navigation-tabs react-navigation-stack

expo install react-native-gesture-handler react-native-reanimated
```

First we need to connect react-redux with our app, using createStore, combineReducers and Provider. Then we create our reducer using our dummy-data to provide our initialState

Then, to start with navigation, we create our navigator using createStackNavigator imported from 'react-navigation-stack'

In order to create our products screen, we need a product component. We could create this component inside our screen file, but as our product isn't small, we create a separated file to store this component (= ProductItem.js).
To fix our price with two decimal numbers, we can use toFixed(2).

To use custom fonts, we first need to add expo-fonts by installing it

```bash
expo install expo-fonts
```

Then create a constant to store our fonts in a javascript object inside Font.loadAsync. Then, with useState and AppLoading we set our app to start after the font is loaded.

To manage our cart products we will also use redux. So we create a new reducer/action called cart

useReducer is a hook that helps with state managment and we use it when we have connected states or more complex state and dont want to have a bunch of individuals states. It is not redux reducer.
Tip: use useReducer outside of our component so it will no be rendered every time to avoid unecessary recreation of this fuction.

## Database Connection

To connect to a database (Firebase) we create a project inside firebase, then go to Develop > Database and scroll down to Realtime Database then click Create database and start with Test mode (Dont require authentication).

We need to install redux-thunk (redux middleware) that allows us to change action creators and handle side effects (assynchronous). To start using redux-thunk we first need to import applyMiddleware from redux and ReduxThunk from redux-thunk inside our App.js file. Then we pass applyMiddleware as a function and as second argument in createStore. Inside this function we pass ReduxThunk.

In product action, we change our createProduct to a dispatch function so we can use redux-thunk and add any async code inside this new function. To connect to our database, we use fetch function and pass our database url that we want send a request to. We can also use any segment that we want and pass after / so firebase will create a folder that stores all arguments in that segment.
IMPORTANT: when create a new segment, it is important to end with .json.

By default, fetch will send a get request, but to store data firebase wants a post request. To send that we need to pass a second argument to fetch which is a js object with the method (in this case, 'POST' method)

### Authentication with Firebase

Firebase has authentication built in. We go to Develop -> Authentication -> Set up sign-in method -> Email/Password -> Enable. With that we can create users or log them in.

To learn more about firebase auth api, go to https://firebase.google.com/docs/reference/rest/auth.

To get the API_KEY, go to the Gear -> Project Settings

To allow write only to authenticated users, we can go to Database -> Rules and change .write to "auth != null". To validate the token form firebase we just pass ?auth=TOKEN to the end of our URL that writes inside our app (like updateProducts, deleteProducts and createProducts)

## Pull to Refresh

When working with FlatList, we can use a prop called onRefresh to add a pull to refresh. It receives a function that should refresh our screen. By adding this prop we should also add refreshing, a prop that points to a state that says if we are refreshing or not.

## User Authentication

### How authentication works

The app send datas to the server (email, password, etc). The server responds with something (error, success) (and store a session on the server and return a session key to the front end. With that session key, the browser is able to find out that the user using this app is authenticated. This is for web applications). For mobile apps it works a bit differently because there you communicate with service which are stateless (i.e. restfull api or graphql api). And there you don't really have a session because the server doesn't care about the individual clients. Instead we work with tokens.

When you log in and the server checks the e-mail and password and determines that both is correct, the server creates a token. This token is send to the app and there you can store it in some storage, i.e. the redux storage. If the user log out, we simply delete this token.

This token is also used for something else on the server. For example, certain URL which are only exposed to logged in users, like creating products in this app.
