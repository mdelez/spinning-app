import { authClient } from "@/auth/auth.config";
import { SplashScreen, useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { User } from '../types/spinning.types.js';

SplashScreen.preventAutoHideAsync();

type AuthState = {
    isReady: boolean;
    isLoggedIn: boolean;
    user: User | null;
    // logIn: (role: Role) => void;
    logOut: () => void;
}

// const tokenKey = "access-token";

export const AuthContext = createContext<AuthState>({
    isReady: false,
    isLoggedIn: false,
    user: null,
    // logIn: () => { },
    logOut: () => { }
})

// const users: { role: Role, id: string }[] = [
//     {
//         role: 'USER',
//         id: '3a8d5f62-1e4c-4c9d-a7b1-6f3e9d5c3333'
//     },
//     {
//         role: 'INSTRUCTOR',
//         id: '9f4b2d73-8c6e-4c1f-9b5a-2a7d8e4f2222'
//     },
//     {
//         role: 'ADMIN',
//         id: '7c9a1e4f-5e1d-4b6a-b6e4-9c2c3f8a1111'
//     }
// ]

// export function AuthProvider({ children }: PropsWithChildren) {
//     const [isReady, setIsReady] = useState(false);
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [user, setUser] = useState<User | null>(null);
//     const router = useRouter();

//     const logIn = async (role: Role) => {
//         const found = users.find(u => u.role === role);
//         if (!found) return;

//         const fetchedUser = await getUserById(found.id);

//         setUser(fetchedUser);
//         setIsLoggedIn(true);

//         const tokenData = {
//             id: found.id,
//             role,
//         };

//         await SecureStore.setItemAsync(tokenKey, JSON.stringify(tokenData));

//         router.replace("/");
//     };

//     const logOut = async () => {
//         setIsLoggedIn(false);
//         setUser(null);
//         await SecureStore.deleteItemAsync(tokenKey);
//         router.replace("/login");
//     }

//     // TODO: restore user by calling endpoint with token info
//     useEffect(() => {
//         const restoreAuth = async () => {
//             try {
//                 const token = await SecureStore.getItemAsync(tokenKey);

//                 if (!token) {
//                     setIsLoggedIn(false);
//                     setUser(null);
//                     return;
//                 }

//                 const parsed = JSON.parse(token);
//                 const role = parsed.role as Role;

//                 const found = users.find(u => u.role === role);
//                 if (!found) {
//                     setIsLoggedIn(false);
//                     setUser(null);
//                     return;
//                 }

//                 const fetchedUser = await getUserById(found.id);

//                 setUser(fetchedUser);
//                 setIsLoggedIn(true);

//             } catch (error) {
//                 console.log("Error restoring auth", error);
//                 setIsLoggedIn(false);
//                 setUser(null);
//             } finally {
//                 setIsReady(true);
//             }
//         };

//         restoreAuth();
//     }, []);

//     useEffect(() => {
//         if (isReady) {
//             SplashScreen.hideAsync();
//         }
//     }, [isReady])

//     return (
//         <AuthContext.Provider value={{ isReady, isLoggedIn, user, logIn, logOut }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

export function AuthProvider({ children }: PropsWithChildren) {
    const [isReady, setIsReady] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const logOut = async () => {
        await authClient.signOut();
        setIsLoggedIn(false);
        setUser(null);
        router.replace("/login");
    };

    // restore auth on app start
    useEffect(() => {
        const restoreAuth = async () => {
            try {
                const session = await authClient.getSession();

                if (!session || !session.data?.user) {
                    setIsLoggedIn(false);
                    setUser(null);
                } else {
                    setIsLoggedIn(true);
                    setUser(session.data.user as User);
                }
            } catch (err) {
                console.log("Error restoring auth:", err);
                setIsLoggedIn(false);
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
        <AuthContext.Provider value={{ isReady, isLoggedIn, user, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}