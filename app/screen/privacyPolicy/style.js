import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        backgroundColor: '#FFFFFF',
    },
    topSide: {
        backgroundColor: '#EFEFEF',
        width:"100%",
        height: 104,
        paddingHorizontal: 16,
    },
    paginationView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position:'relative'
    },
    backView:{
        position:'absolute',
        left:0
    },
    headerText: {
        fontFamily: "Quicksand-Bold",
        fontSize: 24,
        lineHeight: 30,
        color: '#00405E'
    },
   
    btn: {
        width: 23,
        height: 23, 
        tintColor:'#2B91BF', 
    },
    
})

export default styles 