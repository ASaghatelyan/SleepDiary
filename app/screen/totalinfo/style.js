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
    },
    headerText: {
        fontFamily: "Quicksand-Bold",
        fontSize: 24,
        lineHeight: 30,
        color: '#00405E'
    },
    paginationForm: {
        width: 38,
        height: 37,
        borderColor: '#AFC7D1',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center', 
    },
    paginationText: {
        color: '#2B91BF',
        lineHeight: 17,
        fontSize: 14,
        fontFamily: "Quicksand-Regular",
    },
    bottomSide: {
        backgroundColor: '#fff',
    },
    itemInfoConteiner: {
        backgroundColor: '#fff',
        marginHorizontal: 15,
        paddingVertical: 24,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40
    },
    itemInfo: {
        // width: 170,
        height: 170,
        borderWidth: 1,
        borderColor: '#AFC7D1',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 20,
        marginBottom: 10,
    },
    infoTitle: {
        color: '#00405E',
        fontSize: 14,
        lineHeight: 22,
        fontFamily: "Quicksand-Bold",
        textAlign: 'center',
    },
    infoText: {
        color: '#00405E',
        fontSize: 15,
        lineHeight: 22,
        fontFamily: "Quicksand-Regular",
        textAlign: 'center',
        borderTopWidth: 1,
        borderTopColor: '#B7CCD5',
        paddingTop: 20,
        marginTop: 6,
    },
    itemImg: {
        width: 32,
        height: 32,
    },
    btnView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:100
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
        width: 24,
        height: 24
    },
    btnText:{
        fontFamily:"Quicksand-Medium",
        fontSize:12,
        marginLeft:12,
        color:'#00405E'
    },
    container: {   flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome:{
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
})

export default styles 