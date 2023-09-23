import { StyleSheet, Text, View ,Dimensions,TouchableOpacity} from 'react-native'
import React ,{useRef,useContext,useState,useEffect}from 'react'
import { OriginContext,DestinationContext } from '../contexts/contexts';
import Geolocation from 'react-native-geolocation-service';
navigator.geolocation = require('react-native-geolocation-service');
import {Avatar,Icon} from 'react-native-elements'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {colors,parameters} from '../global/styles'
import {GOOGLE_MAPS_APIKEY} from "@env";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;




const DestinationScreen = ({navigation}) => {
  Geolocation.setRNConfiguration({
    authorizationLevel: 'whenInUse', // or 'always'
    skipPermissionRequests: false,
    authorizationPopUp: true,
  });
 
  
  const {dispatchOrigin} = useContext(OriginContext)
  const {dispatchDestination} = useContext(DestinationContext)
  const navigateToRequestScreen = (bottomSheetIndex) => {
    navigation.navigate("RequestScreen", { state: bottomSheetIndex });
  };
  const [sourcePlaceName, setSourcePlaceName] = useState('');
  const [destinationPlaceName, setDestinationPlaceName] = useState('');

  const TextInput1 = useRef(4);
  const TextInput2 = useRef(5);
  const [destination, setDestination] = useState(false)
  const handleSourceSelection = (selectedPlace) => {
    dispatchOrigin({ type: "ADD_ORIGIN", payload: selectedPlace });
    setSourcePlaceName(selectedPlace.name); // Set the source place name
  };

  // Update destination place when selected
  const handleDestinationSelection = (selectedPlace) => {
    dispatchDestination({ type: "ADD_DESTINATION", payload: selectedPlace });
    setDestinationPlaceName(selectedPlace.name); // Set the destination place name

    // Navigate to the RequestScreen
    navigateToRequestScreen(1);
  };
  
     
  return (
    
    <>
    <View style={styles.view2}>
    <View style ={styles.view1}> 
                    <Icon 
                        type ="material-community"
                        name ="arrow-left"
                        color ={colors.grey1}
                        size ={32}
                        onPress ={()=>navigation.goBack()} 
                    />
                </View>
                
    </View>
                {destination ===false &&
                 <GooglePlacesAutocomplete
                 
                      nearbyPlacesAPI='GooglePlacesSearch'
                      placeholder="From..."
                      listUnderlayColor='auto'
                      currentLocation={true}
                      currentLocationLabel="Current location"
                      debounce={100}
                      ref={TextInput1}
                      minLength={2}
                      enablePoweredByContainer={false}
                      fetchDetails={true}
                      autoFocus = {true}
                      styles={autoComplete}
                      query={{
                        key:GOOGLE_MAPS_APIKEY,
                        language:"en"
                      }}
                      onPress={(data, details = null) => {
                        // Handle source place selection here
                        handleSourceSelection({
                          latitude: details.geometry.location.lat,
                          longitude: details.geometry.location.lng,
                          address: details.formatted_address,
                          name: details.name
                        });
            

                          setDestination(true)
                      }}
                      
                      
                 />
                }
                {destination === true &&
                 <GooglePlacesAutocomplete
                 
                      nearbyPlacesAPI='GooglePlacesSearch'
                      placeholder="Going to..."
                      listUnderlayColor='auto'
                      debounce={40}
                      
                      ref={TextInput2}
                      minLength={2}
                      enablePoweredByContainer={false}
                      fetchDetails={true}
                      autoFocus = {true}
                      styles={autoComplete}
                      query={{
                        key:GOOGLE_MAPS_APIKEY,
                        language:"en"
                      }}
                      onPress={(data, details = null) => {
                        // Handle destination place selection here
                        handleDestinationSelection({
                          latitude: details.geometry.location.lat,
                          longitude: details.geometry.location.lng,
                          address: details.formatted_address,
                          name: details.name
                        });
                      }}
                      
                      
                 />}
                    </>
  )
  
}

export default DestinationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:parameters.statusBarHeight
},

view1:{
  position:"absolute",
  top:25,
  left:12,
  backgroundColor:colors.white,
  height:40,
  width:40,
  borderRadius:20,
  justifyContent:"center",
  alignItems:"center",
  marginTop:30, 
  zIndex: 10
  
},

view3:{
  flexDirection:"row",
  alignItems:"center",
  marginTop:2,   
  marginBottom:10,
  backgroundColor: colors.white,
  height:30,
  zIndex: 10
},

view2:{backgroundColor:colors.white,
      zIndex:4,
      paddingBottom:100,
      
    },

    view24:{
      flexDirection:"row",
      justifyContent:"space-between",
     marginVertical:15,
      paddingHorizontal:20   
  }, 
  
  view25:{
      flexDirection:'row',
     alignItems:"baseline"
  },
  
  flatlist:{
      marginTop:20,
      zIndex:17,
      elevation:8
  },    

})
const autoComplete = {
    
  textInput:{
      backgroundColor: colors.grey6,
      height: 50,
      borderRadius: 5,
      paddingVertical: 5,
      paddingHorizontal: 10,
      fontSize: 15,
      flex: 1,
      borderWidth:1,
      marginHorizontal:15,
  },
  container: {
     paddingTop:20,
    flex: 1,
    backgroundColor:colors.white
        },

  textInputContainer: {
    flexDirection: 'row',
  },
  
}
