

import songData from '@/assets/data/library.json';
import { View, Text, TouchableHighlight, FlatList, TouchableOpacity } from "react-native";
import { defaultStyles } from "@/styles";
import { Image } from 'expo-image';
import { fontSize } from '@/constants/tokens';
import  Ionicons  from '@expo/vector-icons/Ionicons';
import { EvilIcons, FontAwesome, FontAwesome6 } from '@expo/vector-icons';

export default function TrackList(){
    return <FlatList
    data={songData}
    
    ItemSeparatorComponent={()=>(<View style={{
        padding:8
    }}></View>)}

    ListFooterComponent={()=>(<View style={{
        padding:8
    }}></View>)}
    ListHeaderComponent={()=>(<View style={{
        padding:8
    }}></View>)}

    renderItem={({item,index})=>{
        return(
             <TouchableOpacity onPress={()=>{

             }} key={index} >
                <View style={{
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'flex-start'
                    }}>

                        <Image  
                            style={{
                                height:50,
                                width:50,
                                borderRadius:8,

                            }}
                        source={{
                            uri:item.artwork
                        }}/>

                        <View style={{
                            flexDirection:'row',
                            flex:1,
                            justifyContent:'space-between'
                        }}>

                            <View>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={ {fontWeight:'bold', color:'white', fontSize:fontSize.base}}> {item.title} </Text>
                                <Text style={ {color:'#ddd', fontSize:fontSize.sm}}> {item.title} </Text>
                            </View>

                            <TouchableOpacity>
                                <Ionicons name='heart' size={22} color="white"/>
                            </TouchableOpacity>
                        </View>

                </View>

             </TouchableOpacity>
        )
    }}
    />
}