import React, { useState } from "react";
import { View } from "react-native";
import { styles } from "../theme/styles";
import { Button, Snackbar, TextInput, Text } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";

//interface - form login 

interface FormLogin {
    email: string;
    password: string;
}

// interface - message
interface ShowMessage {
    visible: boolean;
    message: string;
    color: string;
}

export const LoginScreen = () => {

    // hook para cambiar estado del formulario 

    const [formLogin, setFormLogin] = useState<FormLogin>({
        email: "",
        password: ""
    });

    // hook useState: cambiar el estado del mensaje 
    const [showMessage, setShowMessage] = useState<ShowMessage>({
        visible: false,
        message: "",
        color: "#fff"
    });

    // función: actualizar el estado del formulario
    const handleSetValue = (key: string, value: string) => {
        setFormLogin({ ...formLogin, [key]: value });
    }

    //useState : permite que la contraseña sea visible o no 
    const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

    // hook para navegar entre screens 

    const navigation = useNavigation();

    //iniciar sesion con el usuario

    const handleSingIn = async () => {
        //validacion de campos llenos
        if (!formLogin.email || !formLogin.password) {
            setShowMessage({
                visible: true,
                message: 'Completa todos los campos',
                color: '#7a0808'
            });
        }
        console.log(formLogin);
        try {
            const response = await signInWithEmailAndPassword(
                auth,
                formLogin.email,
                formLogin.password
            );
            console.log(response);
        } catch (e) {
            console.log(e);
            setShowMessage({
                visible: true,
                message: 'correo o clave no valida',
                color: '#7a0808'
            })
        }
    }
    return (
        <View style={styles.root}>
            <Text style={styles.text}>Inicia Sesion</Text>
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
                secureTextEntry={hiddenPassword}
                onChangeText={(value) => handleSetValue('password', value)}
                right={<TextInput.Icon icon="eye" onPress={() => setHiddenPassword(!hiddenPassword)} />}
            />
            <Button mode="contained" onPress={handleSingIn}>
                Iniciar
            </Button>
            <Text style={styles.textRedirect}
                onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Register' }))}
            >Registrate ahora
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
