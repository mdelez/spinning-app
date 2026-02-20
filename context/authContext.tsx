import { SplashScreen, useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { createContext, PropsWithChildren, useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

type AuthState = {
    isReady: boolean;
    isLoggedIn: boolean;
    logIn: () => void;
    logOut: () => void;
}

const tokenKey = "access-token";

export const AuthContext = createContext<AuthState>({
    isReady: false,
    isLoggedIn: false,
    logIn: () => { },
    logOut: () => { }
})

export function AuthProvider({ children }: PropsWithChildren) {
    const [isReady, setIsReady] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    const logIn = async () => {
        setIsLoggedIn(true);
        await SecureStore.setItemAsync(tokenKey, "user-access-token-replace-me")
        router.replace("/");
    }

    const logOut = async () => {
        setIsLoggedIn(false);
        await SecureStore.deleteItemAsync(tokenKey);
        router.replace("/login");
    }

    useEffect(() => {
        const restoreAuth = async () => {
            try {
                const token = await SecureStore.getItemAsync(tokenKey);
                setIsLoggedIn(!!token);
            } catch (error) {
                console.log("Error reading token", error);
            }
            setIsReady(true);
        };

        restoreAuth();
    }, []);

    useEffect(() => {
        if (isReady) {
            SplashScreen.hideAsync();
        }
    }, [isReady])

    return (
        <AuthContext.Provider value={{ isReady, isLoggedIn, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}