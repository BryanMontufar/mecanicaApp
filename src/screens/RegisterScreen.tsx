import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles'
import { auth } from '../config/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { CommonActions, useNavigation } from '@react-navigation/native'

// interface - FormRegister
interface FormRegister {
  email: string,
  password: string
}

// interface - message
interface ShowMessage {
  visible: boolean;
  message: string;
  color: string;
}

export const RegisterScreen = () => {
  // hook useState: cambiar el estado del formulario
  const [formRegister, setFormRegister] = useState<FormRegister>({
    email: "",
    password: ""
  });

   // hook para navegar entre screens 

   const navigation = useNavigation();
   
  // hook useState: cambiar el estado del mensaje 
  const [showMessage, setShowMessage] = useState<ShowMessage>({
    visible: false,
    message: "",
    color: "#fff"
  });

  //useState : permite que la contraseña sea visible o no 
  const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);


  // función: actualizar el estado del formulario
  const handleSetValue = (key: string, value: string) => {
    setFormRegister({ ...formRegister, [key]: value });
  }

  // función: registrar a nuevos usuarios
  const handleRegister = async () => {
    if (!formRegister.email || !formRegister.password) {
      setShowMessage({
        visible: true,
        message: 'Completa todos los campos',
        color: '#7a0808'
      });
      return;
    }

    // Validar longitud de la contraseña
    if (formRegister.password.length < 6) {
      setShowMessage({
        visible: true,
        message: 'La contraseña debe tener al menos 6 caracteres',
        color: '#7a0808'
      });
      return;
    }

    console.log(formRegister);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        formRegister.email,
        formRegister.password
      );
      setShowMessage({
        visible: true,
        message: 'Registro Exitoso',
        color: '#085f06'
      });

    } catch (e) {
      console.log(e);
      setShowMessage({
        visible: true,
        message: 'No se completó, consulte a su administrador',
        color: '#7a0808'
      });
    }
  }

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Registrate</Text>
      <TextInput
        label="Email"
        mode="outlined"
        placeholder='Escribe tu correo'
        onChangeText={(value) => handleSetValue('email', value)}
      />
      <TextInput
        label="Contraseña"
        mode="outlined"
        placeholder='Escribe tu clave'
        secureTextEntry = {hiddenPassword}
        onChangeText={(value) => handleSetValue('password', value)}
        right={<TextInput.Icon icon = "eye" onPress={() => setHiddenPassword(!hiddenPassword)} />}
      />
      <Button mode="contained" onPress={handleRegister}>
        Registrar
      </Button>
      <Text style={styles.textRedirect}
                onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Login' }))}
            >Ya tienes una cuenta ? Inicia Sesion ahora
            </Text>

      <Snackbar
        visible={showMessage.visible}
        onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
        style={{
          ...styles.message,
          backgroundColor: showMessage.color
        }}>
        {showMessage.message}
      </Snackbar>
    </View>
  )
}
