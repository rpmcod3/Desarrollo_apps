import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Dimensions,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { colors } from "../../global/colors";
import { useEffect, useState } from "react";
import { useSignupMutation } from "../../service/authApi";
import { setUserEmail, setLocalId } from "../../store/slices/userSlice";
import { saveSession } from "../../db";

const textInputWidth = Dimensions.get("window").width * 0.7;

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [triggerSignup, result] = useSignupMutation();

  const dispatch = useDispatch();

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return false;
    }
    
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return false;
    }
    
    if (password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres");
      return false;
    }
    
    return true;
  };

  const onSubmit = () => {
    if (validateForm()) {
      triggerSignup({ email, password, returnSecureToken: true });
    }
  };

  useEffect(() => {
    (async () => {
      if (result.status === "fulfilled") {
        try {
          await saveSession(result.data.localId, result.data.email);
          dispatch(setUserEmail(result.data.email));
          dispatch(setLocalId(result.data.localId));
          Alert.alert("Éxito", "Cuenta creada exitosamente");
        } catch (error) {
          console.log("Error al guardar sesión:", error);
          Alert.alert("Error", "Error al crear la cuenta");
        }
      } else if (result.status === "rejected") {
        Alert.alert("Error", "Error al crear la cuenta. Verifica tus datos.");
      }
    })();
  }, [result]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mycammapp</Text>
      <Text style={styles.subTitle}>Registro</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor={colors.white}
          placeholder="Email"
          style={styles.textInput}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor={colors.white}
          placeholder="Contraseña"
          style={styles.textInput}
          secureTextEntry
        />
        <TextInput
          onChangeText={(text) => setConfirmPassword(text)}
          placeholderTextColor={colors.white}
          placeholder="Confirmar Contraseña"
          style={styles.textInput}
          secureTextEntry
        />
      </View>
      <View style={styles.footTextContainer}>
        <Text style={styles.whiteText}>¿Ya tienes cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text
            style={{
              ...styles.whiteText,
              ...styles.underLineText,
            }}
          >
            ¡Inicia sesión!
          </Text>
        </Pressable>
      </View>

      <Pressable style={styles.btn} onPress={onSubmit}>
        <Text style={styles.btnText}>Registrarse</Text>
      </Pressable>
    </View>
  );
};

export default SignupScreen;

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
});