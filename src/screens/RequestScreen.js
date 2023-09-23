import { StyleSheet, Text, View,Dimensions ,ScrollView,Image,FlatList,TouchableOpacity} from 'react-native'
import React,{useState,useContext,useEffect,useRef,useMemo,useCallback} from 'react'
import BottomSheet, { BottomSheetFlatList,BottomSheetSectionList } from '@gorhom/bottom-sheet';
import {Avatar,Icon} from 'react-native-elements'
import {colors,parameters} from '../global/styles'
import MapComponent from '../components/MapComponent'
import {rideData} from '../global/data'
import { OriginContext ,DestinationContext} from '../contexts/contexts';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function RequestScreen({navigation,route}) {
  const [sourcePlace, setSourcePlace] = useState("");
  const [destinationPlace, setDestinationPlace] = useState("");
  
  const {origin,dispatchOrigin} = useContext(OriginContext)
  const [userOrigin,setUserOrigin] = useState({latitude:origin.latitude,
                                                longitude:origin.longitude})
  const {destination,dispatchDestination} = useContext(DestinationContext)
  const [userDestination,setUserDestination] = useState({latitude:destination.latitude,
                                              longitude:destination.longitude})
                                              const bottomSheetIndex = route.params.state;
                                              const [distance, setDistance] = useState(null);

                                              useEffect(() => {
                                                setUserOrigin({ latitude: origin.latitude, longitude: origin.longitude });
                                                setUserDestination({ latitude: destination.latitude, longitude: destination.longitude });
                                            
                                                // Calculate the distance between origin and destination
                                                if (origin.latitude && origin.longitude && destination.latitude && destination.longitude) {
                                                  const originCoords = { latitude: origin.latitude, longitude: origin.longitude };
                                                  const destinationCoords = { latitude: destination.latitude, longitude: destination.longitude };
                                            
                                                  // Calculate the distance using the Haversine formula
                                                  const calculatedDistance = calculateDistance(originCoords, destinationCoords);
                                            
                                                  // Update the distance state
                                                  setDistance(calculatedDistance);
                                                }
                                              }, [origin, destination]);
                                            
                                              // Function to calculate distance between two coordinates using Haversine formula
                                              const calculateDistance = (coord1, coord2) => {
                                                const lat1 = coord1.latitude;
                                                const lon1 = coord1.longitude;
                                                const lat2 = coord2.latitude;
                                                const lon2 = coord2.longitude;
                                              
                                                const R = 6371; // Radius of the Earth in kilometers
                                              
                                                const dLat = deg2rad(lat2 - lat1);
                                                const dLon = deg2rad(lon2 - lon1);
                                              
                                                const a =
                                                  Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                                                  Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
                                              
                                                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                                              
                                                const distance = R * c; // Distance in kilometers
                                              
                                                return distance;
                                              };
                                              
                                              const deg2rad = (deg) => {
                                                return deg * (Math.PI / 180);
                                              };
                                              

  const bottomsheet1 = useRef(1); 
  const snapPoints1 = useMemo(() => ['5%', '40%','75%'], []);
  const handleSheetChange1 = useCallback((index) => {
  }, []);
  const vehicleData = [
    {
      id: 'bike_scooter',
      name: 'Bike / Scooter',
      image: require('../../assets/scooty.png'),
    },
    {
      id: 'auto_rickshaw',
      name: 'Auto Rickshaw',
      image: require('../../assets/auto.png'),
    },
    {
      id: 'car_city',
      name: 'Car - city',
      image: require('../../assets/bc.png'),
    },
    {
      id: 'car_sedan',
      name: 'Car - Sedan',
      image: require('../../assets/dzire.png'),
    },
    {
      id: 'car_suv',
      name: 'Car - MUV/SUV',
      image: require('../../assets/suv.png'),
    },
  ];
  const calculateFare = (distance, vehicleType) => {
    // Define fare rates per kilometer for each vehicle type (you can adjust these values)
    const fareRates = {
      'Bike / Scooter': {
        baseFare: 20,         // Base fare in Rupees
        perKilometerRate: 10, // Rupees per kilometer
        waitingTimeRate: 5,  // Rupees per minute of waiting
      },
      'Auto Rickshaw': {
        baseFare: 30,
        perKilometerRate: 15,
        waitingTimeRate: 7,
      },
      'Car - city': {
        baseFare: 40,
        perKilometerRate: 20,
        waitingTimeRate: 10,
      },
      'Car - Sedan': {
        baseFare: 50,
        perKilometerRate: 25,
        waitingTimeRate: 12,
      },
      'Car - MUV/SUV': {
        baseFare: 60,
        perKilometerRate: 30,
        waitingTimeRate: 15,
      },
    };
  
    const fareInfo = fareRates[vehicleType];
  
    if (!fareInfo) {
      // Handle invalid vehicle type
      return 'Invalid Vehicle Type';
    }
  
    // Calculate the fare based on distance, base fare, per-kilometer rate, and waiting time
    const baseFare = fareInfo.baseFare;
    const perKilometerRate = fareInfo.perKilometerRate;
    const waitingTimeRate = fareInfo.waitingTimeRate;
  
    const fare = baseFare + perKilometerRate * distance;
    
    // You can also add waiting time charges if applicable
    // const waitingTimeMinutes = 5; // Replace with actual waiting time
    // const waitingTimeCharge = waitingTimeRate * waitingTimeMinutes;
    // const totalFare = fare + waitingTimeCharge;
  
    return `₹${fare.toFixed(2)}`;
  };
  const navigateToVehicleDetail = (vehicle) => {
    navigation.navigate('VehicleDetailScreen', { vehicle, distance, sourcePlace: origin.name || 'Select source place',
    destinationPlace: destination.name || 'Select destination place',userOrigin,userDestination});
  };
  const renderBottomSheetContent = () => {
  if (bottomSheetIndex === 0) {
    return (
      <View>
        <FlatList
          data={rideData.slice(0, 6)} // Show the first 6 items from rideData
          keyExtractor={item => item.id}
          renderItem={renderFlatListItems}
          contentContainerStyle={styles.contentContainer}
          ListHeaderComponent={
            <View style={styles.view10}>
              <View style={styles.view11}>
                <Icon
                  type="material-community"
                  name="star"
                  color={colors.white}
                  size={20}
                />
              </View>
              <View>
                <Text style={styles.text9}>Saved Places</Text>
              </View>
            </View>
          }
          ListFooterComponent={
            <View>
              <View style={styles.view10}>
                <View style={styles.view11}>
                  <Icon
                    type="material-community"
                    name="map-marker"
                    color={colors.white}
                    size={20}
                  />
                </View>
                <View>
                  <Text style={styles.text9}>Set location on map</Text>
                </View>
              </View>
              <View style={styles.view10}>
                <View style={styles.view11}>
                  <Icon
                    type="material-community"
                    name="skip-next"
                    color={colors.white}
                    size={20}
                  />
                </View>
                <View>
                  <Text style={styles.text9}>Enter destination later</Text>
                </View>
              </View>
            </View>
          }
        />
      </View>
    );
  } else {
    // Content for other indices
    return (
      
<FlatList
  data={vehicleData}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.bottomSheetContent}>
      <TouchableOpacity onPress={() => navigateToVehicleDetail(item)}>
        <View style={styles.contentRow}>
          <Text style={styles.bottomSheetText}>{item.name}</Text>
          <Text style={styles.bottomSheetFare}>
  {calculateFare(distance, item.name).toString()}
</Text>
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.image} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )}
/>
    );
  }
};

    useEffect(()=>{
    setUserOrigin({latitude:origin.latitude,
      longitude:origin.longitude});
      setUserDestination({latitude:destination.latitude,
        longitude:destination.longitude});
  },[origin,destination])
 
  const renderFlatListItems = useCallback(({item})=>(
    <View>
          <View style ={styles.view10}>
            <View style ={styles.view11}>
            <Icon 
                    type ="material-community"
                    name ="clock-time-four"
                    color ={colors.white}
                    size ={18}
                    />
            </View>
            <View>
                <Text style ={{fontSize:15,color:colors.grey1}}>{item.street}</Text> 
                <Text style ={{color:colors.grey4}}>{item.area}</Text> 
            </View>
        </View>
    </View>
),[])

  return (
    <View style={styles.container}>
      <View style={styles.view1}>
        <Icon
          type="material-community"
          name="arrow-left"
          color={colors.grey1}
          size={32}
          onPress ={()=>navigation.goBack()} 

        />
      </View>
      <View style={styles.view2}>
          <View style={styles.view4}>
             <View style={styles.view99}>
              
                <Image
                  style={styles.image1}
                  source={require("../../assets/transit.png")}
                />
             </View>
             <View>
              <TouchableOpacity onPress={()=>navigation.navigate("DestinationScreen")}>
                  <View style={styles.view6}>
                  <Text style={styles.text10}>{origin.name || 'Select source place'}</Text>
                  </View>
                  </TouchableOpacity>
                  <View style={styles.view7}>
                  <TouchableOpacity>
                     <View style={styles.view5}> 
                     <Text style={styles.text10}>{destination.name || 'Select destination place'}</Text>
                     </View>
                  </TouchableOpacity>
                </View>
             </View>
                
          </View>
           
      </View>
      <View style={styles.textContainer}>
      <Text style={styles.distanceText}>Distance:</Text>
      <Text style={styles.distanceValue}>
        {distance ? distance.toFixed(2) + ' km' : 'Calculating...'}
      </Text>
    </View>
      <MapComponent userOrigin={userOrigin} userDestination={userDestination}/>
      <BottomSheet
          ref={bottomsheet1}
          index={route.params.state}
          snapPoints = {snapPoints1}
          onChange={handleSheetChange1}
        > 
                 {renderBottomSheetContent()}

      </BottomSheet>
    </View>
  )
}



const styles = StyleSheet.create({
      container1:{flex:1,
        paddingTop:parameters.statusBarHeight,
        
    },

    container: {
        flex: 1,
        paddingTop:parameters.statusBarHeight
       
      },
      contentContainer: {
        flex: 1,
        alignItems: 'center',
       
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
        marginTop:20, 
        zIndex: 8
        
      },

      view2:{
        height:SCREEN_HEIGHT*0.18,
        alignItems:"center",
        zIndex: 5,
        backgroundColor:colors.white
      },
      
      view3:{
          flexDirection:"row",
          alignItems:"center",
          marginTop:2,   
          marginBottom:10,
          backgroundColor: colors.white,
          //height:30,
          zIndex:10,
           
        
      },
      view4:{
            flexDirection:"row",
            alignItems:"center",
            marginTop:-25
            
      },
      view44:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:-25,
        
  },
      view5:{
          backgroundColor:colors.grey7,
          width:SCREEN_WIDTH*0.70,
          height:40,
          justifyContent:"center",
          marginTop:10,
          
      },
      view6:{
        backgroundColor:colors.grey6,
        width:SCREEN_WIDTH*0.70,
        height:40,
        justifyContent:"center",
        marginTop:70,
        paddingLeft:0
    },
    view99:{
        marginTop:60
    },
      text1:{
          marginLeft:10,
          fontSize:16,
          color:colors.grey1
      },
    
      image1:{  height:70,
                width:30,
                marginRight:10,
                marginTop:10
            },
     view7:{
         flexDirection:"row",
         alignItems:"center"
     },
     view8:{
         marginLeft:10
     },
     view10:{
        alignItems:"center",
        flex:5,
        flexDirection:"row",
        paddingVertical:10,
        borderBottomColor:colors.grey5,
        borderBottomWidth:1,
        paddingHorizontal:15
     },
     view11:{
        backgroundColor:colors.grey,
        height:30,
        width:30,
        borderRadius:15,
        alignItems:"center",
        justifyContent:"center",
        marginRight:15,
        marginTop:15,
     },

     contentContainer: {
        backgroundColor: 'white',
      },

    view12:{
        alignItems:"center",
        paddingVertical:10,
        borderBottomWidth:1,
        borderBottomColor:colors.grey4
    },

    text2:{
        fontSize:18,
        color:colors.grey1
    },
    text3:{
        fontSize:16,
        color:colors.black,
        fontWeight:"bold",
        marginRight:5,
     
    },

    text4:{color:colors.grey2,
        marginTop:4
                },

    view13:{
        flexDirection:"row",
        alignItems:"flex-start",
        justifyContent:"space-between",
        paddingHorizontal:15,
        paddingVertical:5
    },

    button1:{
        height:40,
        width:100,
        backgroundColor:colors.grey6,
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20
     },

    button2:{
        height:50,
        backgroundColor:colors.grey10,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        marginHorizontal:30
     },

    
  
     button1Text:{
       
       fontSize:17,
       marginTop:-2,
       color:colors.black
  
     },

     button2Text:{
        color:colors.white,
        fontSize:23,
        marginTop:-2,
       
   
      },

      
    view14:{
     
    
      alignItems:"center",
      flex:5,
      flexDirection:"row"
    },
    view15:{
      backgroundColor:colors.grey6,
      height:40,
      width:40,
      borderRadius:20,
      alignItems:"center",
      justifyContent:"center",
      marginRight:20
      
    },

    view16:{
        flexDirection:"row",
        alignItems:"baseline"
    },

    text5:{
        fontSize:12,
        color:colors.black,
        marginLeft:3,
        fontWeight:"bold",
        paddingBottom:1
        
    },
    
    view17:{
        
      },

    view18:{
      
    

      },

    view19:{flex:1.7,
        alignItems:"flex-end",
      
    },

    icon:{paddingBottom:2},

    image2:{height:60,width:60 },

    view20:{marginRight:10 },

    text6:{
        fontSize:15,
        color:colors.black,
        fontWeight:"bold", 
    },

    view21:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginHorizontal:30,
        marginTop:15
    },

 view22:{
        alignItems:"center",
        marginBottom:-20
 },

 sectionHeaderContainer: {
    backgroundColor: "white",
    marginTop:30,
    paddingLeft:15
  },

 text7 : {
    fontSize:28,
    color:colors.black,
    marginRight:5,
 
},

text8:{
    fontSize:15,
    color:colors.grey2,
    textDecorationLine:"line-through"
 
 
},

button3:{
   
    height:60,
    backgroundColor:colors.black,
    alignItems:"center",
    justifyContent:"center",
    width:SCREEN_WIDTH-110,
    marginBottom:10
 },

view23:{
   flexDirection:"row", 
   backgroundColor:colors.cardbackground,
  // elevation:10,
   justifyContent:"space-between",
   alignItems:"flex-end",
   paddingHorizontal:20,
   height:80,
  
},

button2Image:{
    height:55,
    width:55,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:colors.grey6,
    marginBottom:10,
    
}
,
text9:{fontSize:15,
       color:colors.grey1
    },


    map:{
        marginVertical: 0,
        width:SCREEN_WIDTH,
        zIndex: -1
      }, 
      
      centeredView: {
        zIndex:14
      },
      modalView: {
        marginHorizontal: 20,
        marginVertical:60,
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical:20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        zIndex:16
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
        marginTop:20
    },

   text10:{color:colors.grey2,
           paddingLeft:10
        },
        

        bottomSheetContent: {
          padding: 5,
          backgroundColor: colors.white,
        },
        contentRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        bottomSheetText: {
          fontSize: 18,
          fontWeight: 'bold',
          textAlign: 'left', // Align text to the left
        },
        imageContainer: {
          alignItems: 'flex-end', // Align image to the right
        },
        image: {
          width: 125,
          height: 100,
        },
        textContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
          paddingHorizontal: 20,
        },
        distanceText: {
          fontSize: 20,
          fontWeight: 'bold',
          color: colors.black,
          marginRight: 10, // Add some margin between the text and other elements
        },

})