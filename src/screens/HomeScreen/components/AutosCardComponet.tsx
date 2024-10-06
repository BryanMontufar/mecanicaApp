import React from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { styles } from "../../../theme/styles";

export const AutosCardComponet = () => {
    return (
        <View style={styles.rootIconAuto}>
            <View>
                <Text variant='labelLarge'>Placa:</Text>
                <Text variant='bodyMedium'>Modelo:</Text>
            </View>
            <View style={styles.iconHeader}>
                <IconButton
                    icon="arrow-right-bold-box"
                    size={30}
                    mode='contained-tonal'
                    onPress={() => console.log('Pressed')}
                />
            </View>
        </View>
    )
}