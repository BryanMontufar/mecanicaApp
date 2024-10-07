import React from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { styles } from "../../../theme/styles";
import { Autos } from "../HomeScreen";
import { CommonActions, useNavigation } from "@react-navigation/native";

//interface -Props

interface Props {
    auto: Autos;
}

export const AutosCardComponet = ({auto}: Props) => {

    // hook usenavigator permite navegar de un screen a otro
    const navigation = useNavigation();


    return (
        <View style={styles.rootIconAuto}>
            <View>
                <Text variant='labelLarge'>Placa: {auto.placa}</Text>
                <Text variant='bodyMedium'>Modelo: {auto.modelo} </Text>
            </View>
            <View style={styles.iconHeader}>
                <IconButton
                    icon="arrow-right-bold-box"
                    size={30}
                    mode='contained-tonal'
                    onPress={() => navigation.dispatch(CommonActions.navigate({name: 'Detalles', params: {auto} }))}
                />
            </View>
        </View>
    )
}