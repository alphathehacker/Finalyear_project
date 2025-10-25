import React from 'react';
import Select from '../../../components/ui/Select';

const LocationSelector = ({ selectedLocations, onLocationChange, className = "" }) => {
  const locationOptions = [
    { value: 'andhra-pradesh', label: 'Andhra Pradesh' },
    { value: 'telangana', label: 'Telangana' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'pune', label: 'Pune' },
    { value: 'kolkata', label: 'Kolkata' },
    { value: 'ahmedabad', label: 'Ahmedabad' },
    { value: 'jaipur', label: 'Jaipur' },
    { value: 'lucknow', label: 'Lucknow' },
    { value: 'bhopal', label: 'Bhopal' },
    { value: 'chandigarh', label: 'Chandigarh' },
    { value: 'guwahati', label: 'Guwahati' }
  ];

  return (
    <div className={className}>
      <Select
        label="Preferred Locations"
        description="Select cities/states where you want to study"
        options={locationOptions}
        value={selectedLocations}
        onChange={onLocationChange}
        placeholder="Select preferred locations"
        multiple
        searchable
        clearable
      />
    </div>
  );
};

export default LocationSelector;