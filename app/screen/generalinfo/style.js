import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        backgroundColor: '#FFFFFF',
    },
    topSide: {
        backgroundColor: '#EFEFEF',
        width: "100%",
        height: 104,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontFamily: "Quicksand-Bold",
        fontSize: 24,
        lineHeight: 30,
        color: '#00405E'
    },
    bottomSide: {
        backgroundColor: '#fff',
        paddingHorizontal: 15
    },
    title: {
        marginTop: 34,
        fontFamily: "Quicksand-Bold",
        fontSize: 18,
        lineHeight: 22,
        color: '#00405E'
    },
    text: {
        marginVertical: 16,
        fontFamily: "Quicksand-Regular",
        fontSize: 18,
        lineHeight: 30,
        color: '#000000'
    },
    btnView: {
        width: '100%',
        justifyContent: 'space-around',
        marginTop: 49,
    },
    btn: {
        width: 160,
        height: 37,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#2B91BF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 70,
        marginBottom: 45
    },
    vectorImg: {
        width: 20,
        height: 20
    },
    btnText: {
        fontFamily: "Quicksand-Medium",
        fontSize: 12,
        marginLeft: 12,
        color: '#00405E'
    },
    modalView: {
        width: '90%',
        height: '30%',
        backgroundColor: '#EFEFEF',
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalBtnView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 40
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 30,
    },
    modalText: {
        fontFamily: "Quicksand-Bold",
        fontSize: 16,
        lineHeight: 22,
        color: '#00405E',

    },
    textStyle: {
        fontFamily: "Quicksand-Medium",
        fontSize: 14,
        marginLeft: 12,
        color: '#00405E'
    },
    chooseView: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    chooseStyle: {
        marginRight: 10,
        fontFamily: "Quicksand-Medium",
        fontSize: 16,
        marginLeft: 12,
        color: '#00405E'
    },
    selectStyle: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#AFC7D1',
        width: 70,
        height: 35,
    },
    selectText: {
        color: '#2B91BF',
        fontFamily: "Quicksand-Regular",
    },
    dowlandPdf: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconStyle: {
        width: 12,
        height: 7
    },
    policyView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    policyIcon: {
        width: 23,
        height: 23,
        tintColor: '#2B91BF',
        marginLeft:12
    },
    textPolicy: {
        color: '#2B91BF',
        marginVertical: 16,
        fontFamily: "Quicksand-Regular",
        fontSize: 18
    }
})

export default styles 