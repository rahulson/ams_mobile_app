import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { AMButton } from '../../components/Button/AMButton'
import { STORE_USER_INFO } from '../../store/User.Action'
import { useAppContext } from '../../provider/UserProvider'
import { ScanQrCode } from '../../components/ScanQRCode'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import QRCode from 'react-native-qrcode-svg';
import DropDownPicker from 'react-native-dropdown-picker';
import { addAttendance, AttendancePayload } from '../../api/Attendance'

const Home = () => {

    const appContext = useAppContext()
    const dispatch = appContext && appContext.dispatch
    const state = appContext && appContext.state
    const auth = state.auth
    const [isShowQR, setShowQR] = useState(false)
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [qrCodeString, setQRCodeString] = useState('')
    const [items, setItems] = useState([
        { label: 'Java', value: 'Java' },
        { label: 'C programming', value: 'C programming' },
        { label: 'Data Structure and Algorithm', value: 'Data Structure and Algorithm' },
        { label: 'Ethical Hacking', value: 'Ethical Hacking' }
    ]);

    const [showQRCode, toggleShowQRCode] = useState(false)

    const onTapButton = () => {
        dispatch({ type: STORE_USER_INFO, payload: null })
    }

    const setQRString = (code) => {
        console.log("QR Code", code)
        const payload = JSON.parse(code)
        const attendancePayload = {
            userId: auth.id,
            subject: payload.subject,
            teacherId: payload.teacherId
        }
        onSubmit(attendancePayload)
    }

    const onSubmit = async(payload) => {
        try {
            const response = await addAttendance(payload)
            console.log("Data", response.data)
        } catch (error) {
            console.log("Data Error", error)
        }

    }

    const onTapQRButton = () => {
        toggleShowQRCode(true)
    }

    const onTapGenerateQRButton = () => {
        if (isShowQR) {
            setShowQR(false)
            setValue(null)
            setQRCodeString('')
        }
        else {
            setShowQR(true)
            const body = {
                teacherId: auth.id,
                subject: value
            }
            setQRCodeString(JSON.stringify(body))
        }
    }

    const renderQR = () => {
        return (
            <View style={{ width: '100%', justifyContent: 'center', alignItems: "center", marginVertical: hp(1) }}>
                <QRCode
                    size={250}
                    value={qrCodeString}
                />
            </View>
        )
    }

    const renderInfo = () => {
        if (auth?.role === 'student') {
            return (
                <>
                    <AMButton style={{ marginBottom: hp(1) }} onPress={onTapQRButton} text="Show QR Scanner" />
                    <AMButton onPress={onTapButton} text="Logout" />
                </>
            )
        }
        else {
            return (
                <>
                    <View style={{ marginBottom: hp(2), zIndex: 1000 }}>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            placeholder='Subject'
                            multiple={false}
                        />
                    </View>
                    <AMButton onPress={onTapGenerateQRButton} text={isShowQR ? 'Hide QR' : 'Generate QR'} />
                    <AMButton onPress={onTapButton} text="Logout" />
                    {isShowQR ? renderQR() : null}
                </>
            )
        }
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={{ marginBottom: hp(1), fontSize: hp(2.3) }}>{`Name: ${auth?.firstname}`}</Text>
                <Text style={{ marginBottom: hp(1), fontSize: hp(2.3) }}>{`Role: ${auth?.role.toUpperCase()}`}</Text>
                {renderInfo()}
            </View>

            {showQRCode && (
                <ScanQrCode
                    multiple={false}
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
        paddingHorizontal: wp(2)
    }
})

export default Home