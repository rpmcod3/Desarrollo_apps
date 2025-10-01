import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { CartScreen } from "../../screens"
import Header from "../../components/Header"

const Stack = createNativeStackNavigator  ()

const CartStackNavigator =() => {
    return (
        <Stack.Navigator
            initialRouteName="CartScreen"
            screenOptions={{
                header: () => <Header title="Mycammapp" subtitle="Carrito" />
            }}
        >
            <Stack.Screen name="CartScreen" component={CartScreen} />
        </Stack.Navigator>
    )
}

export default CartStackNavigator