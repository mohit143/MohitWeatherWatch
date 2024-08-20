
import React from "react";
import { request, PERMISSIONS, RESULTS} from "react-native-permissions";
import { Platform } from "react-native";

type Result = typeof RESULTS
export default function usePermissions() {
    console.log('Permission outside')
    const requestLocationPermission = async () => {
        console.log('Permission inside')

        try {
            console.log('Permission')
            const locationPermissionRequest = await request(
                Platform.OS === "ios"
                    ? PERMISSIONS.IOS.LOCATION_ALWAYS
                    : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
                    
            );

            console.log(locationPermissionRequest)
            return locationPermissionRequest === 'granted' ? true : false 
        } catch (err) {
            return false
        }
    }

    return {
        requestLocationPermission
    }
}
