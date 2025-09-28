

import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useEffect,useState } from "react";

import { colors } from "../global/colors";

import AuthStackNavigator from "./auth/AuthStackNavigator";

import TabsNavigator from "./tabs/TabsNavigator";
import { useGetProfilePictureQuery } from "../service/profileApi";
import { setImage, setLocalId } from "../store/slices/userSlice";
import { initSessionTable, getSession } from "../db/index"
import { setUserEmail } from "../store/slices/userSlice";

 




const MainNavigator = () => {
    const email = useSelector(state => state.userReducer.email)
    const localId = useSelector(state => state.userReducer.localId)

    const [checkingSession, setCheckingSession] = useState(true);


    const dispatch = useDispatch()

    const { data: profilePicture, isLoading, error } = useGetProfilePictureQuery(localId)

    useEffect(() => {
        const bootstrap = async () => {
            await initSessionTable();
            const session = await getSession(); 
            if (session) {
                console.log("Session:", session)
                dispatch(setUserEmail(session.email))
                dispatch(setLocalId(session.localId))
            }
            setCheckingSession(false);
        };

        bootstrap();
    }, []);

    useEffect(() => {
        if (profilePicture) {
            dispatch(setImage(profilePicture.image))
        }
    }, [profilePicture])

    if (checkingSession) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={colors.Dark_Cyan} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {
                email ? <TabsNavigator/> : <AuthStackNavigator />
            }
        </NavigationContainer>
    )
}

export default MainNavigator