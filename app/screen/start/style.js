import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        backgroundColor: '#FFFFFF'
    },
    groupView: {
        flex: 1,
        alignItems: 'center',
        marginTop: 60,
    },
    group: {
        width: 270,
        height: 270,
    },
    startText: {
        fontSize: 24,
        fontFamily: "Quicksand-Bold",
        textAlign: 'center',
        lineHeight: 40,
        color: '#00405E'
    },
    chooseView: {
        borderBottomWidth: 1,
        borderBottomColor: '#E6E4EA',
        marginHorizontal: 15,
        alignItems: 'center',
        flexDirection:'row'
    },
    calendarImg: {
        width: 15,
        height: 15,
    },
    openImg:{
        width:12,
        height:8,
        alignSelf:'center'
    }

})

export default styles 