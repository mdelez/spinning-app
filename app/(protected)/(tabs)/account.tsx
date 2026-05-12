import { AuthContext } from "@/context/authContext";
import { useTheme } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { Button, Text, View } from "react-native";

export default function Account() {
    const { colors } = useTheme();
    const authContext = useContext(AuthContext);
    const queryClient = useQueryClient();

    function logOut() {
        authContext.logOut();
        queryClient.clear();
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.background
            }}
        >
            <Text style={{ color: colors.text }}>User account settings</Text>
            <Button title="Log out" onPress={logOut} />
        </View>
    );
}