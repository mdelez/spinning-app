import { AuthContext } from "@/context/authContext";
import { useTheme } from "@react-navigation/native";
import { useContext } from "react";
import { Button, Text, View } from "react-native";

export default function Index() {
  const { colors } = useTheme();
  const authContext = useContext(AuthContext);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background
      }}
    >
      <Text style={{ color: colors.text }}>Welcome to the app!</Text>
      <Text className="text-cyan-400">Hello</Text>
      <Button title="Log out" onPress={authContext.logOut} />
    </View>
  );
}
