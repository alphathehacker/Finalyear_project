import React from 'react';
import Select from '../../../components/ui/Select';

const CategorySelector = ({ selectedCategory, onCategoryChange, className = "" }) => {
  const categoryOptions = [
    { value: 'general', label: 'General', description: 'General Category' },
    { value: 'obc', label: 'OBC-NCL', description: 'Other Backward Classes - Non Creamy Layer' },
    { value: 'sc', label: 'SC', description: 'Scheduled Caste' },
    { value: 'st', label: 'ST', description: 'Scheduled Tribe' },
    { value: 'ews', label: 'EWS', description: 'Economically Weaker Section' },
    { value: 'pwd', label: 'PwD', description: 'Person with Disability' }
  ];

  return (
    <div className={className}>
      <Select
        label="Category"
        description="Select your reservation category"
        options={categoryOptions}
        value={selectedCategory}
        onChange={onCategoryChange}
        placeholder="Select category"
        required
      />
    </div>
  );
};

export default CategorySelector;