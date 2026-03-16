import { authClient } from "@/auth/auth.config";
import { SplashScreen, useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Alert } from "react-native";
import { User } from '../types/spinning.types.js';

SplashScreen.preventAutoHideAsync();

type AuthState = {
    isReady: boolean;
    isLoggedIn: boolean;
    isLoading: boolean;
    user: User | null;
    logIn: (email: string, password: string) => void;
    logOut: () => void;
    signUp: (
        email: string,
        firstName: string,
        lastName: string,
        shoeSize: number,
        password: string,
        passwordConfirm: string
    ) => void;
}

export const AuthContext = createContext<AuthState>({
    isReady: false,
    isLoggedIn: false,
    isLoading: false,
    user: null,
    logIn: () => { },
    logOut: () => { },
    signUp: () => { }
})

export function AuthProvider({ children }: PropsWithChildren) {
    const [isReady, setIsReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const isLoggedIn = !!user;

    const logIn = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            await authClient.signIn.email(
                {
                    email,
                    password,
                },
                {
                    onRequest: () => setIsLoading(true),
                    onSuccess: (ctx) => {
                        setIsLoading(false);
                        const user = ctx.data?.user;

                        if (!user) {
                            console.error("Login succeeded but no user returned", ctx);

                            Alert.alert(
                                "Login failed",
                                "Something went wrong. Please try again."
                            );

                            return;
                        }

                        setUser(user as User);
                        router.replace("/");
                    },
                    onError: (ctx) => {
                        setIsLoading(false);
                        Alert.alert("Login failed", ctx.error?.message || "Unknown error");
                    },
                }
            );
        } catch (err) {
            setIsLoading(false);
            console.error("Unexpected login error:", err);
            Alert.alert("Login failed", "Unexpected error occurred");
        }
    };

    const logOut = async () => {
        await authClient.signOut();
        setUser(null);
        router.replace("/login");
    };

    const signUp = async (
        email: string, 
        firstName: string, 
        lastName: string, 
        shoeSize: number, 
        password: string, 
        passwordConfirm: string
    ) => {
        if (password !== passwordConfirm) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        try {
            await authClient.signUp.email(
                {
                    email,
                    password,
                    name: `${firstName} ${lastName}`,
                    firstName,
                    lastName,
                    shoeSize,
                    callbackURL: "spinningapp://auth/callback",
                },
                {
                    onRequest: () => setIsLoading(true),
                    onSuccess: (ctx) => {
                        setIsLoading(false);
                        const user = ctx.data?.user;

                        if (!user) {
                            console.error("Sign up succeeded but no user returned", ctx);

                            Alert.alert(
                                "Sign up failed",
                                "Something went wrong. Please try again."
                            );

                            return;
                        }

                        setUser(user as User);
                        router.replace("/");
                    },
                    onError: (ctx) => {
                        setIsLoading(false);
                        Alert.alert("Sign up failed", ctx.error?.message || "Unknown error");
                    },
                }
            );
        } catch (err) {
            setIsLoading(false);
            console.error("Unexpected sign up error", err);
            Alert.alert("Sign up failed", "Unexpected error occurred");
        }
    }

    // restore auth on app start
    useEffect(() => {
        const restoreAuth = async () => {
            try {
                const session = await authClient.getSession();

                if (!session || !session.data?.user) {
                    setUser(null);
                } else {
                    setUser(session.data.user as User);
                }
            } catch (err) {
                console.log("Error restoring auth:", err);
                setUser(null);
            } finally {
                setIsReady(true);
            }
        };

        restoreAuth();
    }, []);

    useEffect(() => {
        if (isReady) {
            SplashScreen.hideAsync();
        }
    }, [isReady]);

    return (
        <AuthContext.Provider value={{ isReady, isLoggedIn, isLoading, user, logIn, logOut, signUp }}>
            {children}
        </AuthContext.Provider>
    );
}