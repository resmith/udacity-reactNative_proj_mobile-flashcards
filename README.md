# Udacity React Final Project

## for React Native

Mobile FlashCards

## Install / Run Process

## Technology Used

[React Redux](https://react-redux.js.org/)
[See this code example for model used] (https://codesandbox.io/s/todo-app-with-redux-forked-myztr)
[React Navigation]()
[Safe Area View - as recommended by React Navigation](https://github.com/th3rdwave/react-native-safe-area-context)

## Next Steps

[Redux ToolKit](https://redux-toolkit.js.org/) looks to be the next step. The standard Redux was used to ensure the fundamentals were solidly utilized.

Creation of stylesheets based on props (see src/components/CustomButton)

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
