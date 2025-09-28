import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Dimensions,
  Switch,
} from "react-native";
import { useDispatch } from "react-redux";
import { colors } from "../../global/colors";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../../service/authApi";

import { setUserEmail, setLocalId } from "../../store/slices/userSlice";
import { saveSession, clearSession } from "../../db";

const textInputWidth = Dimensions.get("window").width * 0.7;

const LoginScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [persistSession, setPersistSession] = useState(false);
  const [triggerLogin, result] = useLoginMutation();

  const dispatch = useDispatch();

  const onsubmit = () => {
    triggerLogin({ email, password });
  };

  useEffect(() => {
   
    (async () => {
      if (result.status === "fulfilled") {
        try {
          if (persistSession) {
            await saveSession(result.data.localId, result.data.email);
            dispatch(setUserEmail(result.data.email));
            dispatch(setLocalId(result.data.localId));
          } else {
            await clearSession();
            dispatch(setUserEmail(result.data.email));
            dispatch(setLocalId(result.data.localId));
          }
        } catch (error) {
          console.log("Error al guardar sesión:", error);
        }
      }
    })();
  }, [result]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mycammapp</Text>
      <Text style={styles.subTitle}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor={colors.white}
          placeholder="Email"
          style={styles.textInput}
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor={colors.white}
          placeholder="Password"
          style={styles.textInput}
          secureTextEntry
        />
      </View>
      <View style={styles.footTextContainer}>
        <Text style={styles.whiteText}>¿Sin cuenta aun ?</Text>
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text
            style={{
              ...styles.whiteText,
              ...styles.underLineText,
            }}
          >
            Podrias crearte una !
          </Text>
        </Pressable>
      </View>

      <Pressable style={styles.btn} onPress={onsubmit}>
        <Text style={styles.btnText}>Login</Text>
      </Pressable>
      <View style={styles.rememberMe}>
        <Text style={{ color: colors.white }}>¿Recordar sesion?</Text>
        <Switch
          onValueChange={() => setPersistSession(!persistSession)}
          value={persistSession}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.purple,
  },
  title: {
    color: colors.black,
    fontFamily: "",
    fontSize: 24,
  },
  subTitle: {
    fontFamily: "",
    fontSize: 18,
    color: colors.black,
    fontWeight: "700",
    letterSpacing: 3,
  },
  inputContainer: {
    gap: 16,
    margin: 16,
    marginTop: 48,
    alignItems: "center",
  },
  textInput: {
    padding: 8,
    paddingLeft: 16,
    borderRadius: 16,
    backgroundColor: colors.darkGray,
    width: textInputWidth,
    color: colors.white,
  },
  footTextContainer: {
    flexDirection: "row",
    gap: 8,
  },
  whiteText: {
    color: colors.white,
  },
  underLineText: {
    textDecorationLine: "underline",
  },
  strongText: {
    fontWeight: "900",
    fontSize: 16,
  },
  btn: {
    padding: 16,
    paddingHorizontal: 32,
    backgroundColor: colors.black,
    borderRadius: 16,
    marginTop: 32,
  },
  btnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  error: {
    padding: 16,
    backgroundColor: colors.red,
    borderRadius: 8,
    color: colors.white,
  },
  rememberMe: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});





