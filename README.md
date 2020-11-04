# Udacity React Final Project

## for React Native

Mobile FlashCards

## Install / Run Process

You'll need a mobile emulator. For Android, that's either Android Studio or GenyMotion. I've used both and prefer GenyMotion, but it's about \$150/year for a personal license.

## Technology Used

[React Redux](https://react-redux.js.org/)
[See this code example for model used] (https://codesandbox.io/s/todo-app-with-redux-forked-myztr)
[React Navigation]()
[Safe Area View - as recommended by React Navigation](https://github.com/th3rdwave/react-native-safe-area-context)
[Redux and Async Logic](https://redux.js.org/tutorials/fundamentals/part-6-async-logic)

## Next Steps

[Redux ToolKit](https://redux-toolkit.js.org/) looks to be the next step. The standard Redux was used to ensure the fundamentals were solidly utilized.

Creation of stylesheets based on props (see src/components/CustomButton)

[Reactotron for debugging](https://shift.infinite.red/start-using-reactotron-in-your-expo-project-today-in-3-easy-steps-a03d11032a7a)
[Reactotron w/ Redux](npm install --save-dev reactotron-redux)

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
            }}
          >
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
