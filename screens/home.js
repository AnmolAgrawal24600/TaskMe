import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity,FlatList,Dimensions,Modal,SafeAreaView} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
//import {tempData} from '../tempData.js'
import ToDo from '../components/toDo.js';
import { useState ,useEffect} from 'react';
import AddList from '../components/addList.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as NavigationBar from 'expo-navigation-bar';




export default function Home() {  
 
//   const fun = ()=> {
//    // setTimeout(() => {myList.current.scrollToIndex({index:0,animated:false})} , 100)
//   }
   // console.log('entered')
    const ITEM_SIZE = Dimensions.get('window').width;
    const [addListOpen,setAddListOpen] = useState(false);
    
    NavigationBar.setBackgroundColorAsync("#151616");
    
    const [dummy,setDummy] = useState(false);

    const [data,setData] = useState([]);

    const reRenderHome = ()=>{
      setDummy(!dummy);
    }



    useEffect(()=>{
        
      const importData = async()=>{
          try
          {
            const impData = await AsyncStorage.getItem('ToDo');
            setData(JSON.parse(impData));
            //console.log('data imported')
          }
          catch(err){
              console.log(err);
          }    
      } 

      importData();
    },[])

  

    useEffect(()=>{
        
        const addToStorage = async (data) =>{
            try{
                const dataString = JSON.stringify(data);
                await AsyncStorage.setItem("ToDo",dataString);
                //console.log('data sent');
            }
            catch(err){console.log(err)};
        }
        addToStorage(data);
    },[data])
    
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      <StatusBar backgroundColor="#151616" style='light' />
        
        <Modal visible={addListOpen} onRequestClose={()=>{setAddListOpen(false)}} animationType='fade' transparent={true}>   
            <AddList setAddListOpen={setAddListOpen} data={data} setData={setData}/>
        </Modal>


        <View style={styles.titleBar}>
          <View style={styles.divider}/>
          <Text style={styles.title1}>Task<Text style={styles.title2}>Me</Text></Text>
          <View style={styles.divider}/>
        </View>

        <View style={{marginVertical:45,marginBottom:50}}>
          <TouchableOpacity style={styles.addBar} onPress={()=>{setAddListOpen(true)}}>
            <AntDesign name="plus" size={35} color="#0DCDF8" style={styles.addIcon}/> 
          </TouchableOpacity>
          <Text style={styles.addText}>Add List</Text>
        </View>

        <View style={styles.listBar}>
            <FlatList data={data} keyExtractor={item=>item.name} horizontal={true} 
            showsHorizontalScrollIndicator={false}  bounces={false}
                renderItem={({item})=><ToDo item={item} setData={setData} data = {data} reRenderHome={reRenderHome}/>}
                contentContainerStyle={{paddingHorizontal:0.2*ITEM_SIZE}} />
        </View>
        

    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151616',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBar:{
   
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
   // backgroundColor:'white',
    
  },
  divider:{
    height:2,
    backgroundColor:'#0DCDF8',
    flex:1,
    alignSelf:'center',
  },
  title1:{
    marginHorizontal: 20,
    fontSize:35,
    fontWeight:500,
    color:'#D9DDDE'
  },
  title2:{
    color:'#0DCDF8',
    fontWeight:700
  },
  addBar:{
    padding:7,
    alignItems:'center',
    borderWidth: 2,
    borderRadius: 8,
    justifyContent:'center',
    borderColor:'#0DCDF8',
  },
  addText:{
    marginTop:5,
    fontSize: 13,
    alignSelf:'center',
    color:'#0DCDF8'
  },
  addIcon:{   
   
   
  },
  listBar:{
    height: 300,
    //backgroundColor:'white'
   // marginHorizontal:10
  },
 

});
