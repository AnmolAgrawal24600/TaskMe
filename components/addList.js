import {View,Text,StyleSheet,KeyboardAvoidingView,TouchableOpacity,TextInput,TouchableWithoutFeedback,Keyboard,Alert,SafeAreaView} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import * as NavigationBar from 'expo-navigation-bar';


export default AddList=({setAddListOpen,data,setData})=>{
    
    const colors = ['#21A31E',"#2198C7","#5355CB","#711FBE","#AC5CB0","#BF404A","#D17342"];
    const [listVal,setListVal] = useState({name:'',color:'#21A31E',todo:[]})
    NavigationBar.setBackgroundColorAsync("#151616");
   
    const handleSubmit=()=>{
        if(listVal.name.length)
        {   if(data)
           { const found = data.find(item=> item.name===listVal.name);
            if(found)
            {
                Alert.alert('List Already Exists')
            } else{
                setData([...data,listVal]);
                setAddListOpen(false);
                setListVal({name:'',color:'#21A31E',todo:[]})
                }
            }
            else{
            setData([listVal]);
            setAddListOpen(false);
            setListVal({name:'',color:'#21A31E',todo:[]})
            }
        }
    }

    return(
        <SafeAreaView style={{flex:1}}>
     <KeyboardAvoidingView behavior='height' style={{flex:1}}>  

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex:1,backgroundColor:'rgba(0, 0, 0, 0.85)'}}>
            
            <View style={[styles.container,{borderColor:listVal.color}]}>
            
                <TouchableOpacity style={{position:'absolute',top:15,right:15}} onPress={()=>{setAddListOpen(false); }}>
                    <AntDesign name="close" size={30} color={listVal.color} />
                </TouchableOpacity>
                
                <Text style={styles.title1}>Create New<Text style={styles.title2}> List</Text></Text>

                <TextInput style={styles.input} placeholder='List Name' placeholderTextColor='#D3D6D7' underlineColorAndroid='rgba(0, 0, 0, 0)'
                    onChangeText={(text)=>{setListVal((prev)=>({...prev,name:text}))}} value={listVal.name}
                />

                <View style={styles.colorCont}>{colors.map((color)=>{
                    return(
                        <TouchableOpacity key={color} style={[styles.colorIcon,{backgroundColor:color,borderWidth:color===listVal.color?2:0.4}]} onPress={()=>{setListVal((prev)=>({...prev,color:color}))}}/>
                    )})}
                </View>

                <TouchableOpacity style={[styles.button,{backgroundColor:listVal.color}]} activeOpacity={0.5} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
                
            </View>

        </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView> 
    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:10,
        marginVertical:50,
        backgroundColor:'#151616',
        borderRadius: 30,
        borderWidth:1,
        // borderColor:'#0DCDF8',
        paddingHorizontal:30
    },
    title1:{
        color:'#FBFBFB',
        fontSize: 30,
        fontWeight: 600,
        paddingHorizontal:10
    },
    title2:{

        color:'#0DCDF8',
        fontSize: 35,
        fontWeight: 600,

    },
    input:{
        fontSize: 20,
        padding:10,
        paddingHorizontal:15,
        borderWidth:0.5,
        borderColor:'#FBFBFB',
        alignSelf:'stretch',
        borderRadius:5,
        marginVertical: 20,
        color:'#FBFBFB'
    },
    buttonText:{
        fontSize:22,
        color:'#FBFBFB',
        fontWeight:600,
        textAlign:'center'
    },
    button:{
        borderRadius:5,
        paddingHorizontal:20,
        alignSelf:'stretch',
        paddingVertical:7,
        marginTop:40,
        borderWidth:0.3,
        borderColor:'white'
    },
    colorCont:{
       flexDirection:'row',
       justifyContent:'space-around',
       alignSelf:'stretch',
       marginVertical:10

    },
    colorIcon:{
        height:25,
        width:25,
        borderRadius:5,
        borderWidth:0.4,
        borderColor:'white',
    }
})