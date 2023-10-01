import axios from "axios";
const apiKey = "AIzaSyD0uFBrEpD6YHbEgZC8JfbKehO8a1nMCwY";
const transportationMode: "driving-car" | "foot-walking" | "transit" =
  "transit";
async function getTravelTime(
  origin: string,
  destination: string
): Promise<number | null> {
  try {
    // Geocode the origin and destination addresses to obtain coordinates
    const geocodingBaseUrl =
      "https://maps.googleapis.com/maps/api/geocode/json";

    const originResponse = await axios.get(geocodingBaseUrl, {
      params: {
        address: origin,
        key: apiKey,
      },
    });

    const originLocation = originResponse.data.results[0].geometry.location;

    const destinationResponse = await axios.get(geocodingBaseUrl, {
      params: {
        address: destination,
        key: apiKey,
      },
    });

    const destinationLocation =
      destinationResponse.data.results[0].geometry.location;

    // Use the Directions API to get travel time for the specified mode
    const directionsBaseUrl =
      "https://maps.googleapis.com/maps/api/directions/json";

    const directionsResponse = await axios.get(directionsBaseUrl, {
      params: {
        origin: `${originLocation.lat},${originLocation.lng}`,
        destination: `${destinationLocation.lat},${destinationLocation.lng}`,
        mode: transportationMode, // Specify the transportation mode
        key: apiKey,
      },
    });

    const directionsData = directionsResponse.data;

    if (directionsData.routes && directionsData.routes.length > 0) {
      // Sum up the durations of all legs of the route
      const totalDurationInSeconds = directionsData.routes[0].legs.reduce(
        (acc: number, leg: { duration: { value: number } }) =>
          acc + leg.duration.value,
        0
      );

      // Convert the total duration to minutes
      const totalDurationMinutes = Math.floor(totalDurationInSeconds / 60);

      return totalDurationMinutes;
    } else {
      return null;
    }
  } catch (error: any) {
    console.error("Error fetching travel time:", error.message);
    return null;
  }
}

export {};
