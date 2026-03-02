import { AuthContext } from "@/context/authContext";
import { useContext } from "react";
import { Button, Text, View } from "react-native";

export default function LoginScreen() {
    const authContext = useContext(AuthContext);

    return (
        <View className="flex-1 justify-center p-4">
            <Text>Login</Text>
            <Button title="Log in as rider" onPress={() => authContext.logIn('USER')} />
            <Button title="Log in as instructor" onPress={() => authContext.logIn('INSTRUCTOR')} />
            <Button title="Log in as admin" onPress={() => authContext.logIn('ADMIN')} />
        </View>
    );
}