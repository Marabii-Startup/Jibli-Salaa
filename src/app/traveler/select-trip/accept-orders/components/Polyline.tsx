"use client";
import { useState, useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";

export function PolyLine(props: { path: google.maps.LatLngLiteral[] }) {
  const map = useMap();
  const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (!map) return;

    // Initialize the polyline if it hasn't been created yet
    if (!polyline) {
      const newPolyline = new google.maps.Polyline({
        path: props.path,
        map: map,
        geodesic: true, // Set to true for a curved line
        strokeColor: "#0acaff",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      setPolyline(newPolyline);
    } else {
      // Update the polyline's path
      polyline.setPath(props.path);
    }

    // Adjust the map to fit the polyline
    if (props.path.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      props.path.forEach((point) => {
        bounds.extend(point);
      });
      map.fitBounds(bounds);
    }

    return () => {
      // Cleanup: remove polyline from map on unmount
      if (polyline) {
        polyline.setMap(null);
      }
    };
  }, [map, polyline, props.path]);

  return null;
}
