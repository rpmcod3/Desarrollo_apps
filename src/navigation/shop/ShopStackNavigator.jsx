
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CategoriesScreen, ProductScreen, ProductsScreen } from "../../screens";

import { useSelector } from "react-redux";



const Stack = createNativeStackNavigator()

const ShopStackNavigator = () => {
    const categorySelected = useSelector(state=> state.shopReducer.categorySelected)
    return (
        
        <Stack.Navigator
        initialRouteName= "Categories"
        screenOptions ={{
            header : ({route}) => (<Header title="Mycammapp" 
                subtitle = {route.name === "Categories"?"Home": categorySelected}
                />)
        }}>
            <Stack.Screen name="Categories" component={CategoriesScreen} />
            <Stack.Screen name="Product" component={ProductScreen} />
            <Stack.Screen name="Products" component={ProductsScreen} />
        </Stack.Navigator>
        
    )
}

export default ShopStackNavigator;

