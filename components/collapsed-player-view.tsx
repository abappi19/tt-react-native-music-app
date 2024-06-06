

import songData from '@/assets/data/library.json';
import { View, Text, TouchableHighlight, FlatList, TouchableOpacity } from "react-native";
import { defaultStyles } from "@/styles";
import { Image } from 'expo-image';
import { fontSize } from '@/constants/tokens';
import  Ionicons  from '@expo/vector-icons/Ionicons';
import { EvilIcons, FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import library from '@/assets/data/library.json';

export default function CollapsedPlayerView(){

    const item = library[0];

    return (
        <View style={{
            position:'absolute',
            bottom:0,
            left:0,
            right:0,
            backgroundColor:'#000',
            padding:8
        }}>
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
                       justifyContent:'flex-end',
                       gap:5,
                       alignItems:'center',
                       paddingHorizontal:4

                   }}>

                       <View style={{
                        flex:1
                       }}>
                           <Text numberOfLines={1} ellipsizeMode='tail' style={ {fontWeight:'bold', color:'white', fontSize:fontSize.base}}> {item.title} </Text>
                           <Text style={ {color:'#ddd', fontSize:fontSize.sm}}> {item.title} </Text>
                       </View>

                       <TouchableOpacity>
                           <Ionicons name='play' size={22} color="white"/>
                       </TouchableOpacity>

                       <TouchableOpacity>
                           <Ionicons name='play-forward' size={22} color="white"/>
                       </TouchableOpacity>
                   </View>

           </View>
        </View>
    )
}