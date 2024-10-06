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

    message: {
        width: '90%'
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

    rootHome:{
        flex:1,
        marginHorizontal:30,
        marginVertical:50
    },
    header:{
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center'

    },

    iconHeader:{
        alignItems:"flex-end",
        flex: 1

    },
    modal:{
        paddingHorizontal:20,
        padding:20,
        backgroundColor: '#fff',
        borderRadius:10,
        gap:10
        
    },

    rootIconAuto:{
        marginTop: 20,
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        gap: 20,
    },

    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },


})

