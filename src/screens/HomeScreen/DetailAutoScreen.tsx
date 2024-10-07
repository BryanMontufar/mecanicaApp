import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button, Divider, Text, TextInput } from 'react-native-paper'
import { styles } from '../../theme/styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Autos } from './HomeScreen'
import { dbRealTime } from '../../config/firebaseConfig'
import { ref, remove, update } from 'firebase/database'

export const DetailAutoScreen = () => {

    //hook useRoute: acceder a toda la informacion de navegacion 
    const route = useRoute();
    //console.log(route);
    //@ts-ignore
    const { auto } = route.params;
    //console.log(auto);

    //hook use navigation permite navegar entre screens
    const navigation = useNavigation();

    //hook use state: cambiar el estado del formulario de editar y eliminar 
    const [formEditar, setformEditar] = useState<Autos>({
        id: '',
        placa: '',
        modelo: '',
        description: '',
        precio: 0,
        color: ''
    });

    //hook useEfect: cargar y mostrar la data en el formulario de detalles 

    useEffect(() => {
        //Actualizar los datos en el formulario
        setformEditar(auto);
    }, []);

    //funcion: actulizar datos del formulario 
    const handleSetValues = (key: string, value: string) => {
        setformEditar({ ...formEditar, [key]: value })
    }

    //fucnion actulziar la data del producto
    const handleUpdateAutos = async () => {
        //console.log(formEditar);
        //1. direccionar a la tabla de datos y al elemento a editar
        const dbRef = ref(dbRealTime, 'autos/' + formEditar.id);
        //2. actualizar el dato seleccionado 
        try {
            await update(dbRef, {
                precio: formEditar.precio,
                color: formEditar.color,
                description: formEditar.description
            });

            //3. Regresar al anterior screen
            navigation.goBack();
        } catch (e) {
            console.log(e);
        }
    }

    //funcion elimina el producto
    const handleDeleteAutos=async ()=>{
        const dbRef = ref (dbRealTime, 'autos/' + formEditar.id);
        try {
            await remove(dbRef);
            navigation.goBack();
        } catch (e) {
            console.log(e);
        }
    }
    
    return (
        <View style={styles.rootDetalle}>
        <View>
            <Text style={styles.detailTitle}>Placa: {formEditar.placa}</Text>
            <Divider style={styles.modalDivider} />
        </View>
        <View>
            <Text style={styles.detailText}>Modelo: {formEditar.modelo} </Text>
        </View>
        <View>
            <Text style={styles.detailText}>Precio: </Text>
            <TextInput
                value={formEditar.precio.toString()}
                onChangeText={(value) => handleSetValues('precio', value)}
                style={styles.input}  // Aplicar el estilo al input
            />
        </View>
        <View>
            <Text style={styles.detailText}>Color:  </Text>
            <TextInput
                value={formEditar.color}
                onChangeText={(value) => handleSetValues('color', value)}
                style={styles.input}  // Aplicar el estilo al input
            />
        </View>
        <View>
            <Text style={styles.detailText}>Descripcion: </Text>
            <TextInput
                value={formEditar.description}
                onChangeText={(value) => handleSetValues('description', value)}
                style={styles.input}  
            />
        </View>
        <Button
            mode='contained'
            icon='update'
            onPress={handleUpdateAutos}
            style={[styles.button, styles.updateButton]}  
        >
            Actualizar
        </Button>

        <Button
            mode='contained'
            icon='delete'
            onPress={handleDeleteAutos}
            style={[styles.button, styles.deleteButton]}  
        >
            Eliminar
        </Button>
    </View>
    )
}
