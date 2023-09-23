import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

const SCREEN_WIDTH = Dimensions.get('window').width
import { colors,parameters } from '../global/styles'
import { filterData,carsAround } from '../global/data'
import { mapStyle} from "../global/mapStyle"
const HomeScreen = ({ navigation }) => {
  const openDrawer = () => {
    navigation.openDrawer(); // Call openDrawer to open the drawer navigator
  };

  const [latlng, setLatLng] = useState({});

  const checkPermission = async () => {
    const hasPermission = await Location.requestForegroundPermissionsAsync();
    if (hasPermission.status === 'granted') {
      const permission = await askPermission();
      return permission;
    }
    return true;
  };

  const askPermission = async () => {
    const permission = await Location.requestForegroundPermissionsAsync();
    return permission.status === 'granted';
  };

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      setLatLng({ latitude: latitude, longitude: longitude });
    } catch (err) {}
  };

  const _map = useRef(1);

  useEffect(() => {
    checkPermission();
    getLocation();
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clearing user data, resetting authentication state, etc.
    
    // After logout, navigate to the login screen
    navigation.replace("LoginScreen"); // Replace with the actual name of your login screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer}>
          <View style={styles.icon1}>
            <Icon
              type="material-community"
              name="menu"
              color="white"
              size={40}
            />
          </View>
        </TouchableOpacity>
        {/* Logout icon in the top-right corner */}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutIcon}>
          <Icon
            type="material-community"
            name="logout"
            color="white"
            size={34}
          />
          </TouchableOpacity>
      </View>
      <ScrollView bounces={false}>
        <View style={styles.home}>
            <Text style={styles.text1}>Next-Gen Ride-Hailing Platform</Text>
            <View style={styles.view1}>
                <View style={styles.view8}>
                    <Text style={styles.text2}>Tap, Ride, Enjoy.</Text>
                    <TouchableOpacity onPress={()=>{navigation.navigate("RequestScreen",{state:0})}}>
                    <View style={styles.button1}>
                      <Text style={styles.button1Text}>Ride - RideHub</Text>
                    </View>
                    </TouchableOpacity>
                    
                </View>
                <View>
                    <Image
                      style={styles.image1}
                      source={require('../../assets/bcc.png')}
                    />
                </View>
            </View>
            
        </View>
        <View>
                
            </View>
            <View style = {styles.view3}>
              <Text style={styles.text3}>Where to?</Text>
              <View style={styles.view4}>
              <Icon type="material-community"
                name="clock-time-four"
                color={colors.grey1}
                size={26}/>
                <Text style={{marginLeft:5}}> Now</Text>
                <Icon type="material-community"
                name="chevron-down"
                color={colors.grey1}
                size={26}/>
              </View>
            </View>
            <View style={styles.view5}>
              <View style={styles.view6}>
                <View style={styles.view7}>
                    <Icon type="material-community"
                    name="map-marker"
                    color={colors.black}
                    size={22}/>
                </View><View>
                <Text style={{fontSize:18,color:colors.black}}>Chettinad Hotel</Text>
                <Text style={{color:colors.grey3}}>Opp Sathy BS, Sathyamangalam </Text>
                </View>
                </View>
                <View>
                <Icon type="material-community"
                    name="chevron-right"
                    color={colors.black}
                    size={26}/>
                </View>
            </View>
            <View style={{...styles.view5,borderBottomWidth:0}}>
              <View style={styles.view6}>
                <View style={styles.view7}>
                    <Icon type="material-community"
                    name="map-marker"
                    color={colors.black}
                    size={22}/>
                </View><View>
                <Text style={{fontSize:18,color:colors.black}}>Bannari Amman Institute of Technology</Text>
                <Text style={{color:colors.grey3}}>Sathy-Bhavani SH, Sathyamangalam </Text>
                </View>
                </View>
                <View>
                <Icon type="material-community"
                    name="chevron-right"
                    color={colors.black}
                    size={26}/>
                </View>
            </View>
         <Text style={styles.text4}>Around you</Text>
         <View style={{alignItems:"center",justifyContent:"center"}}>
            <MapView
                ref={_map}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                customMapStyle={mapStyle}
                showsUserLocation={true}
                followsUserLocation={true}
                rotateEnabled={true}
                zoomEnabled={true}
                toolbarEnabled={true}
                initialregion={{...carsAround[0],latitudeDelta:0.000,longitudeDelta:0.000}}
            >
               {carsAround.map((item, index) => (
    <Marker coordinate={item} key={index.toString()}>
        <Image 
            source={require('../../assets/bcar.png')}
            style={styles.carsAround}
            resizeMode="cover"
        />
    </Marker>
))}
              

            </MapView>
         </View>

      </ScrollView>

      <StatusBar style="light" backgroundColor="#4FC2BC" translucent={true}/>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.white,
    paddingBottom:30,
    paddingTop:parameters.statusBarHeight
},
header:{
  backgroundColor:colors.blue,
  height:parameters.headerHeight,
  alignItems:"flex-start"
 
},

image1:{
 
  height:140,
  width:220,

},

image2:{height:60,width:60,
        borderRadius:30,
      },

home:{
 backgroundColor:colors.blue,
 paddingLeft:20,
 
},

text1:{
 color:colors.white,
 fontSize:21,
 paddingBottom:20,
 fontFamily: 'sans-serif-medium',
 paddingTop:20
},

text2:{
 color:colors.white,
 fontSize:16
},

view1:{
 flexDirection:"row",
 flex:1,
 paddingTop:30
},

button1:{
  height:50,
  width:150,
  backgroundColor:colors.black,
  borderRadius:10,
  alignItems:"center",
  justifyContent:"center",
  marginTop:20
},

button1Text:{
 color:colors.white,
 fontSize:17,
 marginTop:-2,
 fontWeight: 'bold',
 

},
card:{
 alignItems:"center",
 margin:SCREEN_WIDTH/22

},

view2:{marginBottom:5,
      borderRadius:15,
      backgroundColor:colors.grey6
    },

    title:{
      color:colors.black,
      fontSize:16
    },
view3:{flexDirection:"row",
         marginTop :5,
         height:50,
         backgroundColor:colors.grey6,
         alignItems:"center",
         justifyContent:"space-between",
        marginHorizontal:15
        
         },
text3:{marginLeft:15,
        fontSize:20,
        color:colors.black
  },

view4:{ flexDirection:"row",
        alignItems:"center",
        marginRight:15,
        backgroundColor:"white",
        paddingHorizontal:10,
        paddingVertical:2,
        borderRadius:20
        },

view5:{ flexDirection:"row",
alignItems:"center",
backgroundColor:"white",
paddingVertical:25,
justifyContent:"space-between",
marginHorizontal:15,
borderBottomColor:colors.grey4,
borderBottomWidth:1,
flex:1
},

view6:{


alignItems:"center",
flex:5,
flexDirection:"row"
},
view7:{
backgroundColor:colors.grey6,
height:40,
width:40,
borderRadius:20,
alignItems:"center",
justifyContent:"center",
marginRight:20

},

map:{
   
height: 175,
 marginVertical: 0,
 width:SCREEN_WIDTH*0.92
},

text4:{ fontSize:20,
      color:colors.black,
      marginLeft:20,
      marginBottom:20
    },

icon1:  {marginLeft:10,
       marginTop:5
      },

view8: {flex:4,
      marginTop:-25
    } ,
carsAround: {
width: 28,
height: 14,

}, 

location: {
  width: 16,
  height: 16,
  borderRadius:8,
  backgroundColor:colors.blue,
  alignItems:"center",
  justifyContent:"center"
  
  }, 
  
view9:{width:4,
height:4,
borderRadius:2,
backgroundColor:"white"
},
logoutIcon: {
  position: 'absolute',
  top: 10, // Adjust the top value as needed to position the icon
  right: 10, // Adjust the right value as needed to position the icon
  zIndex: 1, // Ensure the icon appears above other content
  backgroundColor: 'transparent', // Adjust the background color as needed
},

})