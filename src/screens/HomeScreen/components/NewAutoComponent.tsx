import React, { useState } from 'react'
import { Button, Divider, IconButton, Modal, Portal, Snackbar, Text, TextInput, } from 'react-native-paper';
import { styles } from '../../../theme/styles';
import { View } from 'react-native';
import { auth, dbRealTime } from '../../../config/firebaseConfig';
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
    const [FormDatosAutos, setFormDatosAutos] = useState({
        placa: '',
        modelo: '',
        description: '',
        precio: 0,
        color: ''
    });

    const [showMessage, setShowMessage] = useState<ShowMessage>({
        visible: false,
        message: "",
        color: "#fff"
    });

    const handleSetValues = (key: string, value: string) => {
        setFormDatosAutos({ ...FormDatosAutos, [key]: value });
    }

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

        const dbRef = ref(dbRealTime, 'autos/' + auth.currentUser?.uid);
        const saveAutos = push(dbRef);

        try {
            await set(saveAutos, FormDatosAutos);
            setShowModalAuto(false);
        } catch (e) {
            setShowMessage({
                visible: true,
                message: 'No se completó el registro, inténtelo nuevamente',
                color: '#7a0808'
            })
        }
    }

    return (
        <>
            <Portal>
                <Modal visible={showModalAuto} contentContainerStyle={styles.modal}>
                    <View style={styles.header}>
                        <Text variant='headlineSmall' style={styles.modalTitle}>Registrar Auto</Text>
                        <View style={styles.iconHeader}>
                            <IconButton
                                icon="close-circle-outline"
                                size={30}
                                onPress={() => setShowModalAuto(false)} />
                        </View>
                    </View>
                    <Divider style={styles.modalDivider} />
                    <TextInput
                        label='Placa'
                        mode='outlined'
                        onChangeText={(value) => handleSetValues('placa', value)}
                        style={styles.input}
                    />
                    <TextInput
                        label='Modelo'
                        mode='outlined'
                        onChangeText={(value) => handleSetValues('modelo', value)}
                        style={styles.input}
                    />
                    <TextInput
                        label='Precio'
                        mode='outlined'
                        keyboardType='numeric'
                        onChangeText={(value) => handleSetValues('precio', value)}
                        style={styles.input}
                    />
                    <TextInput
                        label='Color'
                        mode='outlined'
                        onChangeText={(value) => handleSetValues('color', value)}
                        style={styles.input}
                    />
                    <TextInput
                        label='Descripción'
                        mode='outlined'
                        onChangeText={(value) => handleSetValues('description', value)}
                        style={styles.input}
                    />
                    <Button
                        mode='contained'
                        onPress={handleSaveAutos}
                        style={styles.saveButton}
                        labelStyle={styles.saveButtonText}>
                        Agregar
                    </Button>
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
