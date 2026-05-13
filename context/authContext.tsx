import { authClient } from "@/auth/auth.config";
import { getMe } from "@/features/user/services/users.api";
import { useQueryClient } from "@tanstack/react-query";
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
    const queryClient = useQueryClient();

    const isLoggedIn = !!user;

    const logIn = async (email: string, password: string) => {
        setIsLoading(true);
        const { data, error } = await authClient.signIn.email({ email, password });

        if (error) {
            Alert.alert("Login failed", error.message || "Unknown error");
            return;
        }

        if (!data?.user) {
            Alert.alert("Login failed", "Something went wrong. Please try again.");
            return;
        }

        try {
            const fullUser = await getMe();
            setUser(fullUser);
        } catch {
            setUser(data.user as User);
        }

        setIsLoading(false);

        router.replace("/");
    };

    const logOut = async () => {
        await authClient.signOut();
        queryClient.clear();
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

        setIsLoading(true);
        const { data, error } = await authClient.signUp.email({
            email,
            password,
            name: `${firstName} ${lastName}`,
            firstName,
            lastName,
            shoeSize,
            callbackURL: "spinningapp://auth/callback",
        });
        
        if (error) {
            Alert.alert("Sign up failed", error.message || "Unknown error");
            return;
        }
        
        if (!data?.user) {
            Alert.alert("Sign up failed", "Something went wrong. Please try again.");
            return;
        }
        
        try {
            const fullUser = await getMe();
            setUser(fullUser);
        } catch {
            setUser(data.user as User);
        }
        
        setIsLoading(false);
        router.replace("/");
    }

    // restore auth on app start
    useEffect(() => {
        const restoreAuth = async () => {
            try {
                const session = await authClient.getSession();

                if (!session || !session.data?.user) {
                    setUser(null);
                } else {
                    try {
                        const fullUser = await getMe();
                        setUser(fullUser);
                    } catch {
                        setUser(session.data.user as User);
                    }
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