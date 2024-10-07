import { StyleSheet } from "react-native";


export const styles=StyleSheet.create({
    root:{
        flex:1,
        justifyContent: 'center',
        paddingVertical:50,
        gap:10
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textRedirect:{
        margin:20,
        textAlign: 'center',
        fontSize: 15,
    },
    rootActivity:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center'
    },
    rootIconAuto:{
        marginTop: 20,
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        gap: 20,
    },
    modal: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: '#f8f9fa',
        borderRadius: 15,
        gap: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    modalDivider: {
        marginVertical: 10,
        backgroundColor: '#ced4da',
    },
    saveButton: {
        marginTop: 15,
        backgroundColor: '#198754',
        borderRadius: 10,
        paddingVertical: 8,
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    message: {
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
    },
    rootDetalle: {
        flex: 1,
        backgroundColor: '#f9f9f9',  // Fondo claro para una mejor legibilidad
        padding: 20,
        borderRadius: 10,  // Bordes redondeados para el contenedor
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginHorizontal: 15,
        marginVertical: 20,
    },
    detailTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',  // Color de texto principal
    },
    detailText: {
        fontSize: 18,
        marginBottom: 5,
        color: '#666',  // Texto secundario con un tono más suave
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,  // Inputs con bordes redondeados
        marginBottom: 15,
        borderColor: '#ddd',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    updateButton: {
        backgroundColor: '#4caf50',  // Color verde para actualizar
    },

    deleteButton: {
        backgroundColor: '#e53935',  // Color rojo para eliminar
    },
    rootHome: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: '#f4f4f4', // Fondo suave para una apariencia más clara
      },
    
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
    
      avatar: {
        backgroundColor: '#6200ee', // Fondo para el Avatar
        marginRight: 10,
      },
    
      iconHeader: {
        flex: 1,
        alignItems: 'flex-end',
      },
      fab: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        backgroundColor: '#6200ee', // Color distintivo para el botón flotante
      },
    
      modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
      },
    
      profileInput: {
        marginBottom: 10,
      },
    
      button: {
        marginVertical: 10,
        paddingVertical: 10,
        borderRadius: 10,
      },
    
      signOutButton: {
        backgroundColor: '#e53935',  // Color rojo para el botón de cerrar sesión
      }
});



