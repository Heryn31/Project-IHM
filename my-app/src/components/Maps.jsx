import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

// Conteneur de la carte
const containerStyle = {
  width: "100%",
  height: "400px"
};

// Position du lieu
const center = {
  lat: -18.8792, // exemple : Antananarivo
  lng: 47.5079
};

const MapComponent = () => {
  // Chargement de l'API Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "VOTRE_CLE_API_ICI" // Remplace par ta clé API
  });

  if (!isLoaded) return <div>Chargement de la carte...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
    >
      <Marker position={center} /> {/* Marker interactif */}
    </GoogleMap>
  );
};

export default React.memo(MapComponent);
