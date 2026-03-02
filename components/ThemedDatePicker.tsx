import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { Button, Platform, View } from "react-native";
import { ThemedText } from "./ThemedText";

type Props = {
  label: string;
  value: Date;
  mode: "date" | "time";
  onChange: (newDate: Date) => void;
};

export function ThemedDateTimePicker({ label, value, mode, onChange }: Props) {
  const [show, setShow] = useState(false);
  const { colors } = useTheme();

  const handleChange = (_event: any, selectedDate?: Date) => {
    setShow(Platform.OS === "ios"); // keep open on iOS
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View className="mb-4">
      <ThemedText className="font-semibold mb-2">{label}</ThemedText>
      <Button
        title={
          mode === "date"
            ? value.toLocaleDateString()
            : value.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
        color={colors.primary}
        onPress={() => setShow(true)}
      />
      {show && (
        <DateTimePicker
          value={value}
          mode={mode}
          is24Hour
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
}