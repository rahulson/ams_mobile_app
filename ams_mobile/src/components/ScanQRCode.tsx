import React, { FunctionComponent as Component, useEffect } from 'react'
import { Alert, Linking, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions'
import QRCodeScanner from 'react-native-qrcode-scanner'
import Modal from 'react-native-modal'
import { RNCamera } from 'react-native-camera';


const isIos = Platform.OS === "ios"

export interface ScanQrCodeProps {
    hideQRModal: () => void
    scannedQRString: (text: string) => void
    multiple?: boolean
}

/**
 * This is a React functional component, ready to
 *
 * Component description here for TypeScript tips.
 */
export const ScanQrCode: Component<ScanQrCodeProps> = props => {
    // Note: if you want your componeobservernt to refresh when data is updated in the store,
    // wrap this component in `` like so:
    // `export const ScanQrCode = observer(function ScanQrCode { ... })`

    // Enable this line to retrieve data from the rootStore (or other store)
    // const rootStore = useStores()
    // or
    // const { otherStore, userStore } = useStores()

    const { scannedQRString, hideQRModal, multiple = false } = props

    useEffect(() => {
         async () => {
            const result = await check(isIos ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA)
            if (result === RESULTS.BLOCKED) {
                Alert.alert(
                    'Camera access blocked',
                    'Allow access manually from the settings persmission',
                    [
                        {
                            text: 'Go to settings',
                            onPress: () => Linking.openSettings(),
                        },
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                    ],
                )
            }
        }
    }, [])

    const handleBarCodeScanned = ({ type, data }) => {
        // Alert.alert(`Bar code with type ${type} and data ${data} has been scanned!`)
        // scannedQRString(data)
        // if (!multiple) {
        //     hideQRModal()
        // }
    }

    return (
        <Modal
            isVisible={true}
            onBackdropPress={() => hideQRModal()}
            onSwipeComplete={() => hideQRModal()}
            propagateSwipe={true}
            style={styles.modal}
        >
            <QRCodeScanner
                onRead={handleBarCodeScanned}
                reactivate={multiple}
                flashMode={RNCamera.Constants.FlashMode.torch}
                reactivateTimeout={2500}
                topContent={
                    <TouchableOpacity onPress={() => hideQRModal()} style={styles.button}></TouchableOpacity>
                }
                bottomContent={
                    <TouchableOpacity onPress={() => hideQRModal()} style={styles.button}></TouchableOpacity>
                }
            />
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        width: '100%',
        margin: 0,
    },
    button: {
        flex: 1,
        width: '100%',
    },
})
