import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/colors'

const Flatcard = ({children, style }) => {
    return (
        <View style={{...styles.container,...style}}>
            {children}
        </View>
    )
}

export default Flatcard

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: colors.White,
        padding: 29,
        margin:9,
        elevation: 9,
        fontSize: 30,
    }

})