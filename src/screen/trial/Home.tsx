import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native"

const Home=()=>{
    const navigation:any=useNavigation();
    return(
        <View style ={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Button title="VideoCalls" onPress={() => navigation.navigate('VideoCall')} >

            </Button>
        </View>
    )
}
export default  Home;