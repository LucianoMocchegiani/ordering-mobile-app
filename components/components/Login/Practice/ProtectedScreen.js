
import {useAuth, AuthProvider} from '../../../context/authContext'
import { View, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
export function ProtectedScreen ({children}){
    const {user, loading} = useAuth()
    if(loading){
        return (
          <View style={{flex:1, justifyContent: 'center',alignItems: 'center'}}>
              <Text style={{color:"black"}}>Cargando...</Text>
          </View>
        )
    }
    if (!user){
        return useNavigation().navigate("Login")
    }
    return (
        <>{children}</>
    )
}

