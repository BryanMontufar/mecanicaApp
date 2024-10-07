import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../theme/styles';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, dbRealTime } from '../../config/firebaseConfig';
import firebase, { signOut, updateProfile } from '@firebase/auth';
import { AutosCardComponet } from '../HomeScreen/components/AutosCardComponet';
import { NewAutoComponent } from './components/NewAutoComponent';
import { onValue, ref } from 'firebase/database';
import { CommonActions, useNavigation } from '@react-navigation/native';

//interface - FormUser

interface FormUser {
  name: string;
}

//interface - autos

export interface Autos {
  id: string;
  placa: string;
  modelo: string;
  description: string;
  precio: number;
  color: string;
}

export const HomeScreen = () => {
  //hoook usestate: cambiar el estado del formulario
  const [FormUser, setFormUser] = useState<FormUser>({
    name: ""
  });

  //funcion cerrar sesion
  const handleSignOut = async () => {
    await signOut(auth);
    navigation.dispatch(CommonActions.reset(
      {
        index: 0,
        routes: [{ name: 'Login' }]
      }));
  }

  //hook usestate: capturar y modificar la data del usuario autenticado
  const [userData, setUserData] = useState<firebase.User | null>(null);

  //hook usestate : permitir que el modal se visualice
  const [showModalProfile, setShowModalProfile] = useState<boolean>(false);

  //hook usestate permite que el modal de autos se vea

  const [showModalAuto, setShowModalAuto] = useState<boolean>(false);

  //hook usestate: gestionar la lista de autos 

  const [autos, setAutos] = useState<Autos[]>([]);

  //hook use efect: obtener usuario informacion 
  useEffect(() => {
    //cambiar de null a la data del usuario 
    setUserData(auth.currentUser);
    setFormUser({ name: auth.currentUser?.displayName ?? '' })
    //llamar la funcion para la lista de productos
    getAllAutos();

  }, []);

  //funcion: actualizar informacion del estado del formulario 
  const handleSetValues = (key: string, value: string) => {
    setFormUser({ ...FormUser, [key]: value })
  }
  // funcion actualizar la informacion de usuario autenticado
  const handleUpdateUser = async () => {
    try {
      await updateProfile(userData!,
        { displayName: FormUser.name });
    } catch (e) {
      console.log();
    }
    //OCULTAR MODAL
    setShowModalProfile(false);
  }

  // funcion para obtener los productos y listaron 

  const getAllAutos = () => {
    //1. Crear conexion a la tabla de la bdd
    const dbRef = ref(dbRealTime, 'autos');
    //2. acceder a la data
    onValue(dbRef, (snapshot) => {
      //3. capturar la data 
      const data = snapshot.val(); // obetenr la data en un formato esperado 
      //verificar si existe datos 
      if (!data) return;
      //4 obtener las keys de cada valor
      const getKeys = Object.keys(data);
      //5. crear un arreglo para almacenar cada producto que se obtiene
      const listProduct: Autos[] = [];
      //6. Recorrer las keys para accder a cada producto
      getKeys.forEach((key => {
        const value = { ...data[key], id: key }
        listProduct.push(value);
      }));
      //7. Actualizar la data obtenida en el arreglo del hook usestate
      setAutos(listProduct);
    })

  }

  return (
    <>
      <View style={styles.rootHome}>
        <View style={styles.header}>
          <Avatar.Text size={40} label="BM" style={styles.avatar} />
          <View>
            <Text>Bienvenido</Text>
            <Text>{userData?.displayName}</Text>
          </View>
          <View style={styles.iconHeader}>
            <IconButton
              icon="account-edit"
              size={30}
              mode='contained'
              onPress={() => setShowModalProfile(true)}
            />
          </View>
        </View>

        <View>
          <FlatList
            data={autos}
            renderItem={({ item }) => < AutosCardComponet auto={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
      <Portal>
        <Modal visible={showModalProfile} contentContainerStyle={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>Mi perfil</Text>
            <View style={styles.iconHeader}>
              <IconButton
                icon="close-circle-outline"
                size={30}
                onPress={() => setShowModalProfile(false)}
              />
            </View>
          </View>
          <Divider />
          <TextInput
            mode='outlined'
            label="Nombre"
            value={FormUser.name}
            onChangeText={(value) => handleSetValues('name', value)}
          />
          <TextInput
            mode='outlined'
            label="Correo"
            disabled
            value={userData?.email!}
          />
          <Button mode='contained' onPress={handleUpdateUser} style={styles.saveButton}>Actualizar</Button>
          <Button mode='contained' onPress={handleSignOut} style={[styles.button, styles.deleteButton]}>Cerrar Sesión</Button>
        </Modal>
      </Portal>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setShowModalAuto(true)}
      />
      <NewAutoComponent showModalAuto={showModalAuto} setShowModalAuto={setShowModalAuto} />
    </>
  )

}
