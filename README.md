# Udacity React Final Project

## for React Native

Mobile FlashCards

## Install / Run Process

You'll need a mobile emulator. For Android, that's either Android Studio or GenyMotion. I've used both and prefer GenyMotion, but it's about \$150/year for a personal license.

From a command line terminal

```
1. git clone <this repo>
2. cd to the directory the app is in
3. npm install
4. npm start
```

## Technology Used

[React Redux](https://react-redux.js.org/)
[See this code example for model used] (https://codesandbox.io/s/todo-app-with-redux-forked-myztr)
[React Navigation]()
[Safe Area View - as recommended by React Navigation](https://github.com/th3rdwave/react-native-safe-area-context)
[Redux and Async Logic](https://redux.js.org/tutorials/fundamentals/part-6-async-logic)

## Directory Structure

/src - contains all the app code

/src/components - contains reusable components. CustomButton, Cards, ...

/src/features - organizes the pages by features, which are: decks, cards, quiz and notifications

/src/redux - contains all state management. Within this it's further divided into decks (src/redux/decks) and notifications (src/redux/notifications)

- Othermiddleware used is Thunk
  /src/utils - the data primarily. Also includes the API for Async storage and the expo calls for removal of notifications.

## Redux

The primary redux stores/actions/reducers are:

- decks: The list of decks including the cards. The object has an "allIds" and a "byIds". The "allIds" contains an array of the deck ids. The "byIds" contains the full object details.
- notifications: list of the notfications

The quiz execution is updated in the deck object properties.

## AsyncStorage

This application in addition to using state uses Async storage. At application startup (in App.js) the decks and the notifications are loaded. The quiz statuses are not in Async storage.

## Platforms Tested

This application has been tested for Android with GenyMotion

## Updates

Converted CardAdd to a functional component

## The application

[Home - DeckList](./readmeImages/mobileFlashCard-1-Home-DeckList.png)
[View Deck](./readmeImages/mobileFlashCard-2-ViewDeck.png)
[Add Card](./readmeImages/mobileFlashCard-3-AddCard.png)
[Quiz](./readmeImages/mobileFlashCard-4-Quiz.png)

## Notes

Sometimes with this code, there may have been an easier way, but the intent of this project was to utilize a broad range of coding in react native. For instance, the notifications state could have mimicked the decks state with it's allIds & byIds. That would have been the easy way. It was decided to utilize a different but legitimate method for a greater understanding.

To reset the async storage, go to App.js and uncomment:
store.dispatch(removeDecks); // Used to initialize storage

After opening the app and letting it run, then comment it again

## Issues Encountered

In DeckList, used Flatlist and I needed to pass the navigation to go to the detailed view. Tried using the _extra_ property on Flatlist but couldn't get it to work. Instead used this.props.For this.props to be passed, the function couldn't be defined as _renderDeck() {}_ but instead had to be defined via the arrow syntax _ renderDeck = ({ item }) => {_

```

class DeckList extends Component {
renderDeck = ({ item }) => {
return (
...
<TouchableOpacity
onPress={() => {
this.props.navigation.navigate("DeckView");
}} >
<Text>{item.title}</Text>
</TouchableOpacity>
...
);
};

render() {
return (
...
<FlatList
data={decks}
renderItem={this.renderDeck}
keyExtractor={(deck) => deck.id}
numColumns={1}
ListHeaderComponent={this.renderDeckListHeader}
extraData={navigator}
/>
...
)
}

```

```

```
