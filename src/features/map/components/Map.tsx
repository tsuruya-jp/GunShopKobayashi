import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";

const key = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

const container = {
  width: "100%",
  height: "100%"
};

const center = {
  lat: 35.02001496157767,
  lng: 135.74250988876247
};

const Map = () => {
  return(
    <>
      <LoadScriptNext googleMapsApiKey={key}>
        <GoogleMap
          mapContainerStyle={container}
          center={center}
          zoom={17}
          options={{
            gestureHandling: 'greedy',
            streetViewControl: false,
            fullscreenControl: false,
          }}
        >
          <Marker position={center} label={""} />
        </GoogleMap>
      </LoadScriptNext>
    </>
  )
}

export default Map;