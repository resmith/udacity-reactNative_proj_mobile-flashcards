import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
  FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

// Redux
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { addNotification } from "../../redux/notifications/notificationActions";
import { getNotifications } from "../../redux/notifications/notificationSelectors";
import { timestampToDate } from "../../utils/helpers";

import { dateNextDay } from "../../utils/helpers";

function NotificationManager(props) {
  // Notification info
  const dispatch = useDispatch();
  const [notification, setNotification] = useState(false);

  const [date, setDate] = useState(dateNextDay());
  // const date = dateNextDay();
  const dateString = new Date(date);

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const selectedDateConverted = new Date(selectedDate).getTime();
    const currentDate = selectedDate ? selectedDateConverted : date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const { notifications } = props;
  const notificationsArray = Object.values(notifications).sort(
    (a, b) => a.id - b.id
  );

  return (
    <View style={styles.pageContainer}>
      <View style={styles.viewContainer}>
        <View>
          <Button onPress={showDatepicker} title="Select date" />
        </View>
        <View>
          <Button onPress={showTimepicker} title="Select time" />
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
      <View style={styles.viewContainer}>
        <Text>Date: {dateString ? dateString.toString() : null} </Text>
      </View>
      <View style={styles.viewContainer}>
        <Button
          title="Schedule notification"
          onPress={async () => {
            dispatch(addNotification(date));
          }}
        />
      </View>
      <View style={styles.listContainer}>
        <Text>Notifications</Text>
        <FlatList
          data={notificationsArray}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text style={styles.item}>
              {timestampToDate(item.id)} {item.status}
            </Text>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  viewContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "95%",
    marginTop: 12,
  },
  listContainer: {
    justifyContent: "space-between",
    width: "80%",
    marginTop: 12,
  },
  container: {
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 12,
    height: 44,
  },
});

function mapStateToProps(state) {
  const notifications = getNotifications(state);
  console.log(
    "NotificationManager mapStateToProps notifications: ",
    notifications
  );
  return { notifications };
}

export default connect(mapStateToProps, { addNotification })(
  NotificationManager
);
