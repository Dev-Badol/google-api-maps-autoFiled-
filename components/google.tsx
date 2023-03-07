import React, { useState, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";

interface Address {
  streetNumber: string;
  streetName: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

function AddressForm() {
  const autocompleteRef = useRef<google.maps.places.Autocomplete>();

  const [address, setAddress] = useState<Address>({
    streetNumber: "",
    streetName: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  function handlePlaceSelect(place: google.maps.places.PlaceResult) {
    if (!place || !place.address_components) {
      return;
    }

    const addressComponents = place.address_components;

    const newAddress: Address = {
      streetNumber: "",
      streetName: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    };

    addressComponents.forEach((component) => {
      const componentType = component.types[0];

      switch (componentType) {
        case "street_number":
          newAddress.streetNumber = component.long_name;
          break;
        case "route":
          newAddress.streetName = component.long_name;
          break;
        case "locality":
          newAddress.city = component.long_name;
          break;
        case "administrative_area_level_1":
          newAddress.state = component.short_name;
          break;
        case "postal_code":
          newAddress.postalCode = component.long_name;
          break;
        case "country":
          newAddress.country = component.long_name;
          break;
        default:
          break;
      }
    });

    setAddress(newAddress);
  }

  return (
    <div>
      <Autocomplete
        onLoad={(autocomplete) => {
          autocompleteRef.current = autocomplete;
          autocomplete.setFields(["address_components", "geometry"]);
        }}
        onPlaceChanged={() => {
          if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            if (place && place.address_components) {
              handlePlaceSelect(place);
            } else {
              alert("Please select an address from the suggestions.");
            }
            if (place && !place.geometry) {
              alert(
                "Invalid address, please select an address from the suggestions."
              );
              return;
            }
          }
        }}
      >
        <input type="text" placeholder="Enter an address" />
      </Autocomplete>

      {/* <Autocomplete
        onLoad={(autocomplete) => {
          autocompleteRef.current = autocomplete;

          autocomplete.setFields(["address_components", "geometry"]);
        }}
        onPlaceChanged={() => {
          if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            handlePlaceSelect(place);
          }
        }}
      >
        <input type="text" placeholder="Enter an address" />
      </Autocomplete> */}
      <div>
        <label>Street Number: </label>
        <span>{address.streetNumber}</span>
      </div>
      <div>
        <label>Street Name: </label>
        <span>{address.streetName}</span>
      </div>
      <div>
        <label>City: </label>
        <span>{address.city}</span>
      </div>
      <div>
        <label>State: </label>
        <span>{address.state}</span>
      </div>
      <div>
        <label>Postal Code: </label>
        <span>{address.postalCode}</span>
      </div>
      <div>
        <label>Country: </label>
        <span>{address.country}</span>
      </div>
    </div>
  );
}

export default AddressForm;
