import { useTheme } from "@react-navigation/native";
import { Text, TextProps } from "react-native";

type ThemedTextProps = TextProps & {
  color?: string;
};

export function ThemedText({ style, color, ...props }: ThemedTextProps) {
  const { colors } = useTheme();
  return (
    <Text
      {...props}
      style={[
        { color: color ?? colors.text }, // use theme text color by default
        style,
      ]}
    />
  );
}