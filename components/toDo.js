import { StyleSheet, Text, View,TouchableOpacity,FlatList,Dimensions,Modal} from 'react-native';
import { useState } from 'react';
import DeleteList from './deleteList';
import ListItems from './listItems';
import { AntDesign } from '@expo/vector-icons';
import * as NavigationBar from 'expo-navigation-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default ToDo=({item,setData,data,reRenderHome})=>{

    const ITEM_SIZE = Dimensions.get('window').width*0.60;
    const completedCount = item.todo.filter((val)=>val.completed).length;
    const remCOunt = item.todo.length-completedCount;
    NavigationBar.setBackgroundColorAsync("#151616");

    const [listVisible,setListVisible] = useState(false);
    const [delListVis,setDelListVis] = useState(false);
    return(
       
        <View style={{width:ITEM_SIZE}}>
                <View style={[styles.taskCard,{backgroundColor:item.color}]}>

                    <View style={{marginBottom:2,alignSelf:'flex-end'}}>
                      <TouchableOpacity onPress={()=>{setDelListVis(true)}}>
                        <AntDesign name="closecircleo" size={25} color="#FBFBFB" />
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={()=>{setListVisible(true)}} >

                    <Modal visible={listVisible} animationType='fade' transparent={true} onRequestClose={()=>{setListVisible(false)}}>
                      <GestureHandlerRootView style={{flex:1}}>
                        <ListItems item={item} setListVisible={setListVisible} setData={setData} data={data}/>
                        </GestureHandlerRootView>
                    </Modal>
                    
                    {/* delete a full list start*/}
                      
                    <Modal visible={delListVis} transparent={true} animationType='fade' onRequestClose={()=>{setDelListVis(false)}}>
                        <DeleteList item={item} setDelListVis={setDelListVis} data={data} setData={setData} reRenderHome={reRenderHome}/>
                    </Modal>

                     {/* delete a full list end*/}
                    
                    <Text numberOfLines={2} style={styles.title}>{item.name}</Text>

                    <View style={{flexDirection:'row',marginVertical:5,marginHorizontal:20,width:ITEM_SIZE*0.5}}>
                        <View style={styles.divider}/>
                    </View>
                    
                    <View style={styles.countCont}>
                        <Text style={styles.count}>{remCOunt}</Text>
                        <Text style={styles.countText}>Remaining</Text>
                    </View>

                    <View style={[styles.countCont,{marginTop:10}]}>
                        <Text style={styles.count}>{completedCount}</Text>
                        <Text style={styles.countText}>Completed</Text>
                    </View>
                 </TouchableOpacity>
                
                </View>
        </View>

        
    )
  } 

  const styles = StyleSheet.create({
    taskCard:{
        flex:1,
        paddingHorizontal: 10,
        paddingVertical:10,
        alignItems:'center',
        margin: 10,
        borderRadius: 20,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'white',
      shadowOpacity: 0.8,
      shadowRadius: 5,
      elevation: 5,
        //justifyContent:'center',
      },
      title:{
        color:'#FBFBFB',
        textAlign:'center',
        fontSize:20,
        fontWeight: 600,
        height:55,
        textAlignVertical:"center",
      },
      count:{
        color:'#FBFBFB',
        fontSize:40,
      },
      countText:{
        color:'#FBFBFB',
        fontSize:15,
      },
      countCont:{
        alignItems:'center',
      },
      divider:{
        height:1,
        flex:1,
        backgroundColor:'white',
      }

  })
