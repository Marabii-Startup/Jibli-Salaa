"use client";

import MapSelector from "@/components/Map/MapSelector";
import { AddressObject } from "@/interfaces/Map/AddressObject";
import { useState } from "react";

export default function MapSelectorWrapperTo() {
  const [location, setLocation] = useState<AddressObject>();

  const handleLocationSelect = (loc: AddressObject) => {
    setLocation(loc);
  };

  return (
    <>
      <MapSelector onLocationSelect={handleLocationSelect} />
      <input
        type="text"
        required
        name="to"
        value={location ? JSON.stringify(location) : ""}
        readOnly
        style={{ opacity: 0, height: 0, position: "absolute", zIndex: -1 }}
      />
    </>
  );
}
