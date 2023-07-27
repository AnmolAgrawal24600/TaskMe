import {Text,View,StyleSheet,TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';


export default DeleteList = ({item,setDelListVis,data,setData,reRenderHome}) =>{

    const addToStorage = async (data) =>{
        try{
            const dataString = JSON.stringify(data);
            await AsyncStorage.setItem("ToDo",dataString);
            //console.log('data sent after list deletion');
        }
        catch(err){console.log(err)};
    }

    const deleteItem=()=>{
        const Ndata = data;
        const index = Ndata.findIndex(val=>val.name===item.name);
        Ndata.splice(index,1);
        setData(Ndata);
        setDelListVis(false);
        //console.log('list deleted');
        reRenderHome();
        addToStorage(data);
    }


    return(
        <View style={styles.container}>
            <View style={[styles.delCont,{borderColor:item.color}]}>
                <View style={styles.textCont}>
                    <Text style={styles.title}><Text style={{color:"#0DCDF8",fontWeight:600}}>Embrace</Text> the void. <Text style={{color:item.color}}>Delete</Text> ?</Text>
                </View>

                <View style={styles.iconCont}>
                    <TouchableOpacity onPress={()=>{setDelListVis(false)}}>
                        <AntDesign name="closecircle" size={33} color="#0DCDF8" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{deleteItem()}}>
                        <AntDesign name="checkcircle" size={33} color="crimson" style={{marginLeft:30}}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    delCont:{
        paddingHorizontal:15,
        paddingVertical:15,
        backgroundColor:'#151616',
        borderRadius: 10,
        borderWidth:1,
        borderColor:'#fbfbfb'

    },
    iconCont:{
        flexDirection:'row',
        justifyContent:'flex-end',
        marginTop:25,
        marginRight:10
        
    },
    textCont:{
        //justifyContent:'center',
        //alignItems:'center',
        marginHorizontal:10
    },
    title:{
        color:'#fbfbfb',
        fontSize: 20,
        marginTop: 5
    }

})