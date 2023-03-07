import React, { useState, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { FormikProps } from "formik";
import { Formik, Form, Field } from "formik";


interface Address {
  streetNumber: string;
  streetName: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface AddressFormProps extends FormikProps<any> {
  onAddressSelect: (address: any) => void;
}

function AddressForms({ onAddressSelect, setFieldValue }: AddressFormProps) {
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

    // setAddress(newAddress);
    // setFieldValue("address", `${newAddress.streetNumber} ${newAddress.streetName}`);
    // setFieldValue("city", newAddress.city);
    // setFieldValue("state", newAddress.state);
    // setFieldValue("zip", newAddress.postalCode);
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
            handlePlaceSelect(place);
            // onAddressSelect(place);
          }
        }}
      >
        <input type="text" name="address" placeholder="Enter an address" />
      </Autocomplete>
      <div>
        <label>City: </label>
        <input type="text" name="city" value={address.city} disabled />
      </div>
      <div>
        <label>State: </label>
        <input type="text" name="state" value={address.state} disabled />
      </div>
      <div>
        <label>Zip Code: </label>
        <input type="text" name="zip" value={address.postalCode} disabled />
      </div>
      <div>
        <label>country: </label>
        <input type="text" name="zip" value={address.country} disabled />
      </div>
      <div>
        <label>street: </label>
        <input type="text" name="zip" value={address.streetName} disabled />
      </div>
    </div>

  
  );
}

export default AddressForms;
