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
        alignItems:'center',
        justifyContent:'center'
    },
    headerText: {
        fontFamily: "Quicksand-Bold",
        fontSize:24,
        lineHeight:30,
        color:'#00405E'
    },
    bottomSide: {
        backgroundColor: '#fff',
        paddingHorizontal:15
    },
    title: {
        marginTop:34,
        fontFamily: "Quicksand-Bold",
        fontSize:18,
        lineHeight:22,
        color:'#00405E'
    },
    text: {
        marginVertical:16,
        fontFamily: "Quicksand-Regular",
        fontSize:18,
        lineHeight:30,
        color:'#000000' 
    },
    btnView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
        marginTop:49
    },
    btn: {
        width: 160,
        height: 37,
        borderRadius:25,
        borderWidth:1,
        borderColor:'#2B91BF',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center', 
    },
    vectorImg: {
        width: 20,
        height: 20
    },
    btnText:{
        fontFamily:"Quicksand-Medium",
        fontSize:12,
        marginLeft:12,
        color:'#00405E'
    }
})

export default styles 