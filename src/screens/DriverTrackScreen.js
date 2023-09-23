import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  AnimatedRegion,
} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import { colors } from "../global/styles";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { mapStyle } from "../global/mapStyle";

export default function DriverTrackScreen({ route }) {
  const { userOrigin, userDestination } = route.params;
  const mapRef = useRef(null);
  const [message, setMessage] = useState("Driver is on the way");
  const [pickupOTP, setPickupOTP] = useState(generateRandomOTP());
  const [animationStarted, setAnimationStarted] = useState(false);
  const [showReviewButton, setShowReviewButton] = useState(false); // Add state for showing the "Review" button

  const navigation = useNavigation(); // Get navigation object

  function generateRandomOTP() {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const driverPosition = useRef(
    new AnimatedRegion({
      latitude: userOrigin ? userOrigin.latitude - 0.02 : 0,
      longitude: userOrigin ? userOrigin.longitude : 0,
      latitudeDelta: 0.03,
      longitudeDelta: 0.03,
    })
  ).current;

  useEffect(() => {
    if (userDestination && userDestination.latitude !== null && mapRef.current) {
      mapRef.current.fitToCoordinates([userOrigin, userDestination], {
        edgePadding: { top: 150, right: 50, left: 50, bottom: 150 },
        animated: true,
      });
    }
  }, [userOrigin, userDestination]);

  useEffect(() => {
    if (!animationStarted && driverPosition && userOrigin) {
      const nearbyLocation = {
        latitude: userOrigin.latitude - 0.02,
        longitude: userOrigin.longitude - 0.02,
      };

      setTimeout(() => {
        const animation = driverPosition.timing({
          latitude: nearbyLocation.latitude,
          longitude: nearbyLocation.longitude,
          duration: 10000,
        });

        animation.start(() => {
          setMessage("Driver is at your location");

          setTimeout(() => {
            setMessage("Ride Started");
            setAnimationStarted(true);
          }, 5000);
        });
      }, 2000);
    }
  }, [animationStarted, driverPosition, userOrigin, userDestination]);

  useEffect(() => {
    if (animationStarted && userDestination) {
      driverPosition.timing({
        latitude: userDestination.latitude,
        longitude: userDestination.longitude,
        duration: 5000,
      }).start(() => {
        setMessage("Ride Completed");
        setShowReviewButton(true); // Show the "Review" button when the ride is completed
      });
    }
  }, [animationStarted, driverPosition, userDestination]);

  // Callback to handle "Review" button click
  const handleReviewClick = () => {
    // Navigate to the review screen here
    navigation.navigate("ReviewScreen");
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        rotateEnabled={true}
        customMapStyle={mapStyle}
        zoomEnabled={true}
        toolbarEnabled={true}
        ref={mapRef}
      >
        {userOrigin && userOrigin.latitude != null && (
          <Marker coordinate={userOrigin}>
            <Image
              source={require("../../assets/bean.png")}
              style={styles.markerOrigin}
              resizeMode="cover"
            />
          </Marker>
        )}
        {userDestination && userDestination.latitude != null && (
          <Marker coordinate={userDestination}>
            <Image
              source={require("../../assets/teddy.png")}
              style={styles.markerDestination}
              resizeMode="cover"
            />
          </Marker>
        )}

        {userDestination &&
          userDestination.latitude != null && (
            <Marker.Animated
              coordinate={driverPosition}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <Image
                source={require("../../assets/dmar.png")}
                style={styles.markerDriver}
                resizeMode="cover"
              />
            </Marker.Animated>
          )}

        {userDestination &&
          userDestination.latitude !== null && (
            <MapViewDirections
              origin={userOrigin}
              destination={userDestination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={4}
              strokeColor={colors.black}
            />
          )}
      </MapView>
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{message}</Text>
        {showReviewButton && (
          <TouchableOpacity onPress={handleReviewClick}>
            <Text style={styles.reviewButton}>Review</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.pickupOTPContainer}>
        <View style={styles.pickupOTPBox}>
          <Text style={styles.pickupOTPLabel}>OTP</Text>
          <Text style={styles.pickupOTPText}>{pickupOTP}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerOrigin: {
    width: 40,
    height: 40,
  },
  markerDriver: {
    width: 35,
    height: 65,
  },
  messageContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: colors.black,
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  messageText: {
    color: "white",
    fontSize: 18,
  },
  pickupOTPContainer: {
    position: "absolute",
    top: 200,
    left: 16,
  },
  pickupOTPBox: {
    backgroundColor: "white",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: "center",
  },
  pickupOTPLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  pickupOTPText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  markerDestination: {
    width: 40,
    height: 40,
  },
  reviewButton: {
    marginTop: 10,
    color: "blue",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  reviewButton: {
    marginTop: 10,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});