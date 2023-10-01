import * as React from "react";
import {
  View,
  Text,
  Button,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { weekDays, daysInEachMonth, months } from "./const";
import { generateMatrix } from "./utils";

function Calendar({ date = new Date() }: { date: Date }) {
  const [activeDate, setActiveDate] = React.useState(date);

  React.useEffect(() => {
    if (activeDate != date) {
      setActiveDate(date);
    }
  }, [date]);

  const _onPress = (item: number) => {
    if (typeof item !== "string" && item != -1) {
      const newDate = new Date(activeDate.setDate(item));
      setActiveDate(newDate);
    }
  };

  const matrix = generateMatrix(activeDate);

  let rows = [];

  rows = matrix.map((row, rowIndex: number) => {
    var rowItems = row.map((item: any, colIndex: number) => {
      return (
        <TouchableOpacity
          onPress={() => _onPress(item)}
          style={[
            styles.date,
            item == activeDate.getDate()
              ? styles.activeDate
              : styles.inActiveDate,
          ]}
        >
          <Text
            style={{
              textAlign: "center",
              color: colIndex == 0 ? "#a00" : "#000",
              fontWeight: item == activeDate.getDate() ? "bold" : "normal",
              fontSize: 14,
            }}
          >
            {item != -1 ? item : ""}
          </Text>
        </TouchableOpacity>
      );
    });

    return <View style={styles.rowContainer}>{rowItems}</View>;
  });

  const changeMonth = (n: number) => {
    const newDate = new Date(activeDate.setMonth(activeDate.getMonth() + n));
    setActiveDate(newDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.currentDate}>
        {`${months[activeDate.getMonth()]} ${activeDate.getFullYear()}`}
      </Text>
      <View style={{ flex: 1 }}>{rows}</View>
      <View style={styles.actionContainer}>
        <View style={{ flex: 1, marginHorizontal: 2 }}>
          <Button
            title="Previous"
            color={"blue"}
            onPress={() => changeMonth(-1)}
          />
        </View>
        <View style={{ flex: 1, marginHorizontal: 2 }}>
          <Button title="Next" color={"blue"} onPress={() => changeMonth(+1)} />
        </View>
      </View>
    </View>
  );
}

export default Calendar;

const styles = StyleSheet.create({
  container: { padding: 12 },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // padding: 0,
  },
  date: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  activeDate: { backgroundColor: "red", borderRadius: 20 },
  inActiveDate: { backgroundColor: "#fff" },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    // flex: 1,
  },
  currentDate: { fontWeight: "600", fontSize: 28, textAlign: "center" },
});
