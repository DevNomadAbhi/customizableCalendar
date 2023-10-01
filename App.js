import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Calendar from "./src/calendar/Calendar";

export default function App() {
  const [value, setValue] = React.useState(new Date());
  const [day, setDay] = React.useState();
  const [month, setMonth] = React.useState();
  const [year, setYear] = React.useState();

  function jumpToDate() {
    const newDate = new Date(year, month - 1, day, 0, 0, 0, 0);
    setValue(newDate);
  }

  function onDayChange(newDate) {
    if (newDate <= 31) {
      setDay(newDate);
    }
  }

  function onMonthChange(newMonth) {
    if (newMonth <= 12) {
      setMonth(newMonth);
    }
  }

  function onYearChange(newYear) {
    setYear(newYear);
  }
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" /> */}
      <View
        style={{
          height: 400,
          backgroundColor: "white",
          borderRadius: 12,
          width: "auto",
        }}
      >
        <Calendar date={value} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
