import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShopStackNavigator   from "../shop/ShopStackNavigator";
import CartStackNavigator from "../cart/CartStackNavigator";
import  Icon  from "react-native-vector-icons/FontAwesome";
import { colors } from "../../global/colors";
import ProfileStackNavigator from "../profile/ProfileStackNavigator";



const Tab = createBottomTabNavigator();

const TabsNavigator =  () => { 
    return ( 
        <Tab.Navigator
            screenOptions ={{
                headerShown : false
            }} 
        >
            <Tab.Screen 
            name="Shop" 
            component={ShopStackNavigator}
            options= {{
                tabBarIcon: ({focused})=>(<Icon name="tags" size ={23} color={focused?colors.Dark_Cyan:colors.Lime_Green}/>) 
            }}
                />

            <Tab.Screen 
            name="Cart" 
            component={CartStackNavigator}
            options= {{
                tabBarIcon: ({focused})=>(<Icon name="credit-card" size ={23} color={focused?colors.Dark_Cyan:colors.Lime_Green}/>) 
            }}
            />
            <Tab.Screen 
                name="Profile" 
                component={ProfileStackNavigator} 
                options={{
                    tabBarIcon: ({focused})=>(<Icon name="user" size={23} color={focused?colors.Dark_Cyan:colors.Lime_Green} />),
                    //tabBarBadge:0,           
                }}
                />
        </Tab.Navigator>
    );
}

export default TabsNavigator 