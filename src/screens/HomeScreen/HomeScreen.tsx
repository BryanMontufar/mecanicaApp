import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Avatar, Text, Button } from 'react-native-paper';
import { styles } from '../../theme/styles';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native'; // Para redirigir al login

//interface - UserAuth
interface UserAuth {
  name: string;
}

export const HomeScreen = () => {
  const [UserAuth, setUserAuth] = useState<UserAuth>({
    name: '',
  });

  const navigation = useNavigation();

  //hook useEffect: validar el estado de autenticación
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserAuth({ name: user.displayName ?? 'NA' });
      }
    });
  }, []);

  // Función para cerrar sesión
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Sesión cerrada correctamente');
        // Redirigir al login después de cerrar sesión
        navigation.navigate('Loginscreen'); // Asegúrate de que 'Login' esté en tus rutas
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  };

  return (
    <View style={styles.rootHome}>
      <View style={styles.headerHome}>
        <Avatar.Text size={30} label="IM" />
        <View>
          <Text>Bienvenido</Text>
          <Text>{UserAuth.name}</Text>
        </View>
      </View>
      
      {/* Botón para cerrar sesión */}
      <Button
        mode="contained"
        onPress={handleSignOut}
        style={{ marginTop: 20 }}
      >
        Cerrar sesión
      </Button>
    </View>
  );
};
