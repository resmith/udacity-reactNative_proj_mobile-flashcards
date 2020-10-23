import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

// import { RECEIVE_DECKS } from "../redux/actionTypes";
import CustomButton from "../components/CustomButton";
import PageHeading from "../components/PageHeading";
import { BUTTON_PRIMARY } from "../utils/constants";
import { getDecks } from "../redux/selectors";

// navigation.navigate("DeckView", {
//   id: item.id,
// });

class DeckList extends Component {
  renderDeck = ({ item }) => {
    return (
      <View style={styles.deck}>
        <View style={styles.deckText}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("DeckView", {
                id: item.id,
              });
            }}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.numOfCards}>
          <Text>{item.numOfCards}</Text>
        </View>
        <View style={styles.quiz}>
          <TouchableOpacity>
            <Text>?</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // renderDeck = ({ item }) => {
  //   return (
  //     <View style={styles.deck}>
  //       <View style={styles.deckText}>
  //         <TouchableOpacity
  //           onPress={() => {
  //             this.props.navigation.navigate("DeckView", {
  //               id: item.id,
  //             });
  //           }}
  //         >
  //           <Text>{item.title}</Text>
  //         </TouchableOpacity>
  //       </View>
  //       <View style={styles.numOfCards}>
  //         <Text>{item.numOfCards}</Text>
  //       </View>
  //       <View style={styles.quiz}>
  //         <TouchableOpacity>
  //           <Text>?</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   );
  // };

  renderDeckListHeader = () => {
    return (
      <View style={styles.deckHeaderContainer}>
        <View style={styles.deckText}>
          <Text style={styles.deckHeaderText}>Title</Text>
        </View>
        <View style={styles.numOfCards}>
          <Text style={styles.deckHeaderText}>#</Text>
        </View>
        <View style={styles.quiz}>
          <Text style={styles.deckHeaderText}>Quiz</Text>
        </View>
      </View>
    );
  };

  render() {
    const { navigation, decks } = this.props;

    return (
      <SafeAreaView>
        <PageHeading title="Deck List" />
        <FlatList
          data={decks}
          renderItem={this.renderDeck}
          keyExtractor={(deck) => deck.id.toString()}
          numColumns={1}
          ListHeaderComponent={this.renderDeckListHeader}
        />
        <CustomButton
          title="Add Deck"
          buttonType={BUTTON_PRIMARY}
          onPress={() => navigation.navigate("DeckAdd")}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  deck: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 5,
  },
  deckHeaderContainer: {
    display: "flex",
    flexDirection: "row",
  },
  deckHeaderText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  deckText: {
    width: 320,
  },
  numOfCards: {
    width: 40,
  },
  quiz: {
    width: 30,
    alignItems: "flex-end",
  },
});

const mapStateToProps = (state) => {
  const decks = getDecks(state);
  return { decks };
};

export default connect(mapStateToProps)(DeckList);
