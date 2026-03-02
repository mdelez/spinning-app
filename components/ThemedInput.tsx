import { useTheme } from "@react-navigation/native";
import { TextInput, TextInputProps } from "react-native";

type ThemedTextInputProps = TextInputProps & {
  color?: string;
  bgColor?: string; // optional background override
};

export function ThemedTextInput({
  style,
  color,
  bgColor,
  ...props
}: ThemedTextInputProps) {
  const { colors } = useTheme();

  return (
    <TextInput
      {...props}
      style={[
        {
          color: color ?? colors.text,
          backgroundColor: bgColor ?? colors.card, // default to theme card bg
        },
        style,
      ]}
    />
  );
}