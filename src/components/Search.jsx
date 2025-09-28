import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TextInput } from 'react-native'
import { colors } from '../global/colors'

const Search = ({setKeyword}) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput 
      placeholder = 'Buscar producto' style={styles.searchInput}
      onChangeText={(text) => {setKeyword(text)}}
       />
       <Icon name='search' size={20} color={colors.White} />
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.White,
        padding: 10,
        borderRadius: 10,
    },
    searchInput: {
        flex: 1,
        padding: 10,
        borderRadius: 10,
    },
})

