import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../theme/styles';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import firebase, { updateProfile } from '@firebase/auth';
import { AutosCardComponet } from '../HomeScreen/components/AutosCardComponet';
import { NewAutoComponent } from './components/NewAutoComponent';

//interface - FormUser

interface FormUser {
  name: string;
}

//interface - autos

interface Autos {
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

  //hook usestate: capturar y modificar la data del usuario autenticado
  const [userData, setUserData] = useState<firebase.User | null>(null);

  //hook usestate : permitir que el modal se visualice
  const [showModalProfile, setShowModalProfile] = useState<boolean>(false);

  //hook usestate permite que el modal de autos se vea

  const [showModalAuto, setShowModalAuto] = useState<boolean>(false);

  //hook usestate: gestionar la lista de autos 

  const [autos, setAutos] = useState<Autos[]>([
    {
      id: '1',
      placa: 'PWC1450',
      modelo: 'Chevrolet',
      description: 'inventario',
      precio: 7000,
      color: 'plomo'
    },
    {
      id: '2',
      placa: 'PBC1160',
      modelo: 'renault',
      description: 'vendido',
      precio: 5000,
      color: 'rojo'
    }
  ]);

  //hook use efect: obtener usuario informacion 
  useEffect(() => {
    //cambiar de null a la data del usuario 
    setUserData(auth.currentUser);
    setFormUser({ name: auth.currentUser?.displayName ?? '' })

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
  return (
    <>
      <View style={styles.rootHome}>
        <View style={styles.header}>
          <Avatar.Text size={30} label="BM" />
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
            renderItem={({ item }) => < AutosCardComponet />}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
      <Portal>
        <Modal visible={showModalProfile} contentContainerStyle={styles.modal}>
          <View style={styles.header}>
            <Text variant='headlineSmall'>Mi perfil</Text>
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
            label="Nombre"
            disabled
            value={userData?.email!}

          />
          <Button mode='contained' onPress={handleUpdateUser}>Actualizar</Button>
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
