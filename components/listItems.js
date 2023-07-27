import {View,Text,StyleSheet,KeyboardAvoidingView,TouchableOpacity,Alert,TextInput,TouchableWithoutFeedback,Keyboard,FlatList,SafeAreaView, Dimensions} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Ionicons,AntDesign,} from '@expo/vector-icons';
import { useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as NavigationBar from 'expo-navigation-bar'
import { PanGestureHandler} from 'react-native-gesture-handler';
import  Animated,{useAnimatedGestureHandler,useSharedValue,useAnimatedStyle,withTiming,withSpring,runOnJS,interpolate} from 'react-native-reanimated';





export default ListItems=({item,setListVisible,setData,data})=>{
    
    NavigationBar.setBackgroundColorAsync("#151616");
    
    const [dummy,setDummy] = useState(true);
    //console.log(item.todo);
    const completedCount = item.todo.filter((val)=>val.completed).length;
    const totalCount = item.todo.length;
    const listName = item.name;
    const [newVal,setNewVal] = useState('')

    const Ndata = data;
    const indexToUpdate = Ndata.findIndex(val => val.name === listName);

    const addToStorage = async (data) =>{
        try{
            const dataString = JSON.stringify(data);
            await AsyncStorage.setItem("ToDo",dataString);
            console.log('data sent after modification');
        }
        catch(err){console.log(err)};
    }

    const changeList=(item)=>{
        const index = Ndata[indexToUpdate].todo.findIndex(val=>val.title===item.title)
        let val = Ndata[indexToUpdate].todo[index].completed
        Ndata[indexToUpdate].todo[index] = {...Ndata[indexToUpdate].todo[index],completed:!val}
        setData(Ndata);
        setDummy(!dummy);
        addToStorage(data);
        //can store
    }
   
    const deleteItem = (item) =>{
        const index = Ndata[indexToUpdate].todo.findIndex(val=>val.title===item.title)
        const arr = Ndata[indexToUpdate].todo
        arr.splice(index,1);
        Ndata[indexToUpdate].todo=arr;
        setData(Ndata);
        setDummy(!dummy);
        console.log('list item deleted')
        addToStorage(data);
        
    }

    const addListItem = () =>{
        if(newVal.length)
        {
            obj = {title:newVal,completed:false};
            const foundItem = Ndata[indexToUpdate].todo.find(item => item.title === newVal);
            if(foundItem)
            {
                setNewVal('');
                Keyboard.dismiss();
            }
            else{
                Ndata[indexToUpdate].todo.push(obj);
                setData(Ndata);
                setNewVal('')    
                addToStorage(data);  
            }

        }
    }
    
    const ToDoItem = ({item}) =>{

        // const ICON_COLOR  = useSharedValue('#0DCDF8');
        const width = Dimensions.get('window').width;

        const Treshold = -0.5*width;

        const TranslateX = useSharedValue(0);

        const panGesture = useAnimatedGestureHandler({
            
            onActive: (event)=>{
                TranslateX.value = event.translationX;
            },
            onEnd:()=>{
                const toDelete = TranslateX.value<Treshold;
                if(toDelete){

                   //ICON_COLOR.value='crimson'
                   runOnJS(deleteItem)(item);
                }
                else{ 
                    TranslateX.value=withTiming(0)
                }
            },

        })

        const rstyle = useAnimatedStyle(()=>{
           
            
            return{
                transform:[{
                    translateX: TranslateX.value
                }],

            }
           
        })

        const istyle = useAnimatedStyle(()=>{

            const scale = interpolate(TranslateX.value,[-160,-20],[1,0.2])
            return{
                transform:[{scale:scale}]
            }
        })



        return (
            <View style={{width:'100%',justifyContent:'center'}}>
                <Animated.View style={[styles.iconCont,istyle]}>
                    <AntDesign name="delete" size={24} color='crimson' />
                </Animated.View>
                <PanGestureHandler onGestureEvent={panGesture}>
                    <Animated.View style={[styles.listItemCont,rstyle]}>
                        <Text style={item.completed?styles.titleComp:styles.titleIncomp} numberOfLines={1}>
                            {item.title}
                        </Text>
                        <TouchableOpacity onPress={()=>{changeList(item)}}>
                        {item.completed?<Ionicons name="checkbox-outline" size={24} color="#a6a6a6"/>: <Ionicons name="square-outline" size={24} color="#E3E3E3" />}
                        </TouchableOpacity>
                        
                    </Animated.View>
                </PanGestureHandler>
            </View>
        )
    }

    return(
        <SafeAreaView style={{flex:1}}>
     <KeyboardAvoidingView behavior={null} style={{flex:1}} >  
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
            <View style={[styles.container,{borderTopColor:item.color}]}>
               
                <Text style={[styles.title1]} numberOfLines={2}>{item.name}</Text>
               
               <View style={{alignSelf:'stretch',flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={[styles.title2,{backgroundColor:item.color}]}>{completedCount}/{totalCount} completed</Text>
                <TouchableOpacity onPress={()=>{setListVisible(false)}}>
                <Text style={[styles.title2,{backgroundColor:'#0DCDF8'}]}>Close</Text>
                </TouchableOpacity>
               </View>
               
              
               <View style={styles.listCont}>
                    <FlatList data={item.todo} keyExtractor={val=>val.title} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'
                    contentContainerStyle={{paddingVertical:10}}
                        renderItem={({item})=><ToDoItem item={item} style={{backgroundColor:'white'}}/>}
                    />
               </View>
               
               <View style = {styles.inputCont}>
                 <TextInput style={[styles.input,{borderColor:item.color}]} value={newVal} onChangeText={(text)=>{setNewVal(text)}}
                 placeholder='Add Task' placeholderTextColor='#6A6766' underlineColorAndroid='rgba(0, 0, 0, 0)' multiline/>
                 <TouchableOpacity onPress={addListItem}>
                 <AntDesign name="plussquareo" size={40} color={item.color} />   

                 </TouchableOpacity>
               </View>
                
            </View>
        {/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView> 
    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        //justifyContent:'center',
        borderTopWidth:2,
        //:'white',
        alignItems:'center',
        backgroundColor:'#151616',
        paddingHorizontal:20,
        paddingVertical:10
    },
    title1:{
        color:'#E3E3E3',
        fontSize: 30,
        fontWeight: 600,
        alignSelf:'flex-start'
    },
    title2:{

        color:'#E3E3E3',
        fontSize: 15,
        fontWeight: 400,
        alignSelf:'flex-start',
        paddingHorizontal:10,
        paddingVertical:3,
        marginTop:5,
        borderRadius: 15,
        borderColor:'white',
        borderWidth: 0.3

    },
    listItemCont:{
        backgroundColor:'#151616',
        //width:'90%',
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:4,
        padding:2
    },
    titleComp:{
        color:'#A6A6A6',
        fontSize: 18,
        fontWeight: 500,
        textDecorationLine:'line-through'

    },
    titleIncomp:{
        color:'#E3E3E3',
        fontSize: 18,
        fontWeight: 500

    },
    inputCont:{
        flexDirection: 'row',
        alignItems:'center',
        // backgroundColor:'pink',
        justifyContent:'center',
        alignSelf:'stretch',
        marginVertical:10,
    },

    input:{
        flex:1,
        fontSize: 18,
        paddingHorizontal:15,
        borderWidth:0.6,
        alignSelf:'stretch',
        borderRadius:5,
        marginRight:10,
        color:'#E3E3E3',
        paddingVertical:5,
        paddingHorizontal:8
    },

    listCont:{  
        flex:1,
        marginTop:20,
        alignSelf:'stretch',
        paddingHorizontal: 10,
        //paddingVertical:5,

    },
    iconCont:{
        //backgroundColor:'#FF7171',
        height: 30,
        position:'absolute',
        right:'15%',
        alignItems:'center',
        justifyContent:'center'
    },

})