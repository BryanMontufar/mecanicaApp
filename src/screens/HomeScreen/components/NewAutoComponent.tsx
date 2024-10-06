import React, { useState } from 'react'
import { Button, Divider, IconButton, Modal, Portal, Snackbar, Text, TextInput, } from 'react-native-paper';
import { styles } from '../../../theme/styles';
import { View } from 'react-native';
import { dbRealTime } from '../../../config/firebaseConfig';
import { push, ref, set } from 'firebase/database';

//interface -props

interface Props {
    showModalAuto: boolean;
    setShowModalAuto: Function;
}

// interface - message
interface ShowMessage {
    visible: boolean;
    message: string;
    color: string;
}

// interface - formautos

interface FormDatosAutos {

    placa: string;
    modelo: string;
    description: string;
    precio: number;
    color: string;
}
export const NewAutoComponent = ({ showModalAuto, setShowModalAuto }: Props) => {

    // hook use state cambiar el estado del formulario 

    const [FormDatosAutos, setFormDatosAutos] = useState({
        placa: '',
        modelo: '',
        description: '',
        precio: 0,
        color: ''
    });

    // hook useState: cambiar el estado del mensaje 
    const [showMessage, setShowMessage] = useState<ShowMessage>({
        visible: false,
        message: "",
        color: "#fff"
    });

    // funcion que actualize el estado del formulario

    const handleSetValues = (key: string, value: string) => {
        setFormDatosAutos({ ...FormDatosAutos, [key]: value });
    }

    //funcion: grabar los autos
    const handleSaveAutos = async () => {
        if (!FormDatosAutos.placa || !FormDatosAutos.modelo || !FormDatosAutos.description ||
            !FormDatosAutos.precio || !FormDatosAutos.color) {
            setShowMessage({
                visible: true,
                message: 'Completa todos los campos',
                color: '#7a0808'
            })
            return;
        }

        //1. Crear conexion a la tabla de la bdd
        const dbRef = ref(dbRealTime, 'autos');
        //2. crear una coleccion que agrege los datos a la base de datos
        const saveAutos = push(dbRef);
        //3. almacenar los datos en la base de datos
        try {
            await set(saveAutos, FormDatosAutos);
            //cerrar modal 
            setShowModalAuto(false);
        } catch (e) {
            console.log(e);
            setShowMessage({
                visible: true,
                message: 'No se completo el registro, intelo nuevamente',
                color: '#7a0808'
            })
        }
    }
    return (
        <>
            <Portal>
                <Modal visible={showModalAuto} contentContainerStyle={styles.modal}>
                    <View style={styles.header}>
                        <Text variant='headlineSmall'>Ingresar Auto</Text>
                        <View style={styles.iconHeader}>
                            <IconButton
                                icon="close-circle-outline"
                                size={30}
                                onPress={() => setShowModalAuto(false)} />
                        </View>
                    </View>
                    <Divider />
                    <TextInput
                        label='Placa'
                        mode='outlined'
                        onChangeText={(value) => handleSetValues('placa', value)} />
                    <TextInput
                        label='Modelo'
                        mode='outlined'
                        onChangeText={(value) => handleSetValues('modelo', value)} />
                    <TextInput
                        label='Precio'
                        mode='outlined'
                        keyboardType='numeric'
                        onChangeText={(value) => handleSetValues('precio', value)} />
                    <TextInput
                        label='Color'
                        mode='outlined'
                        onChangeText={(value) => handleSetValues('color', value)} />
                    <TextInput
                        label='Estado'
                        mode='outlined'
                        onChangeText={(value) => handleSetValues('description', value)} />
                    <Button mode='contained' onPress={handleSaveAutos}>Agregar</Button>
                </Modal>
            </Portal>
            <Snackbar
                visible={showMessage.visible}
                onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
                style={{
                    ...styles.message,
                    backgroundColor: showMessage.color
                }}>
                {showMessage.message}
            </Snackbar>
        </>


    )
}
