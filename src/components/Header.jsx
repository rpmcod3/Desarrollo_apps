import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/colors'

const Header = ({title, subtitle}) => {
  return (
    <View style ={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: { 
        backgroundColor: colors.Dark_Cyan,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    title :{
        fontSize: 25,
        color: colors.White
    },
    subtitle: {
        fontSize: 16,
        color: colors.White,
        marginTop: 4
    }
})