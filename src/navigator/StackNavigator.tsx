import { createStackNavigator, } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { View } from 'react-native';
import { ActivityIndicator, } from 'react-native-paper';
import { styles } from '../theme/styles';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';

//interface routes 

interface Routes {
  name: string;
  screen: () => JSX.Element; //conpomente react

}

// arreglos - routes cuando el usuario no este autenticado


const routesNoAuth: Routes[] = [

  { name: 'Login', screen: LoginScreen },
  { name: 'Register', screen: RegisterScreen }
];

// arreglo - routes cuando el usuario este autenticado

const routesAuth: Routes[] = [

  {
    name: 'Home', screen: HomeScreen

  }];

const Stack = createStackNavigator();

export const StackNavigator = () => {

  // hook useState: verificar si esta autenticado o no 

  const [isAuth, setIsAuth] = useState<boolean>(false);

  //hook useState: controlar carga inicial 

  const [isLoadign, setIsLoading] = useState<boolean>(false);

  // hook useEffect validar el estado de autenticacion 

  useEffect(() => {
    //carga indicator 
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {  // existe autenticacion
        //console.log(user);
        setIsAuth(true);
      }

      setIsLoading(false);
    });
  }, []);

  return (
    <>

  {isLoadign? (
    <View style={styles.rootActivity}>
      <ActivityIndicator animating={true} size={35} />
    </View>
  ):(
    <Stack.Navigator>
      {
        !isAuth ?
          routesNoAuth.map((item, index) => (
            <Stack.Screen key={index}
              name={item.name}
              options={{ headerShown: false }}
              component={item.screen} />
          ))
          :
          routesAuth.map((item, index) => (
            <Stack.Screen key={index}
              name={item.name}
              options={{ headerShown: false }}
              component={item.screen} />
          ))
      }
    </Stack.Navigator>
  )}
    </>
  );
}