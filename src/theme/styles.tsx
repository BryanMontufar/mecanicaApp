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
    headerHome:{
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center'

    }

})

