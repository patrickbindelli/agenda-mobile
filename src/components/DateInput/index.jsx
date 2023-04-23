import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Separator } from "../Separator";

import styles from "./styles";

const DateInput = ({ placeholder, date, setDate, error }) => {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    if (!date) {
      setDate(new Date());
    }
    setShow(true);
  };

  const locale = "auto";

  const localeOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  return (
    <View style={styles.container}>
      {error && (
        <Text style={styles.errorText}>Esse campo é obrigatório...</Text>
      )}
      <TouchableOpacity style={styles.input} onPress={showDatepicker}>
        {!date && <Text style={styles.text}>{placeholder}</Text>}
        {date && (
          <Text style={styles.textActive}>
            {date.toLocaleDateString(locale, localeOptions)}
          </Text>
        )}
        <MaterialIcons name="calendar-today" size={20} color="#A09FA6" />
      </TouchableOpacity>
      <Separator />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DateInput;
