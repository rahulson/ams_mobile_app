import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { AMButton } from '../../components/Button/AMButton'
import { STORE_USER_INFO } from '../../store/User.Action'
import { useAppContext } from '../../provider/UserProvider'
import { ScanQrCode } from '../../components/ScanQRCode'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';


const Home = () => {

    const appContext = useAppContext()
    const dispatch = appContext && appContext.dispatch

    const [showQRCode, toggleShowQRCode] = useState(false)

    const onTapButton = () => {
        dispatch({ type: STORE_USER_INFO, payload: null })
    }

    const setQRString = (code) => {
        console.log("QR Code", code)
    }

    const onTapQRButton = () => {
        toggleShowQRCode(true)
    }

    return (
        <>
            <View style={styles.container}>
                <AMButton style={{ marginBottom: hp(1) }} onPress={onTapQRButton} text="Show QR Scanner" />
                <AMButton onPress={onTapButton} text="Logout" />
            </View>
            {showQRCode && (
                <ScanQrCode
                    multiple={true}
                    hideQRModal={() => toggleShowQRCode(false)}
                    scannedQRString={setQRString}
                />
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Home