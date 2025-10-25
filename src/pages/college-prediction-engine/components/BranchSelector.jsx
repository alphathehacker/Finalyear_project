import React from 'react';
import Select from '../../../components/ui/Select';

const BranchSelector = ({ selectedBranches, onBranchChange, examType, className = "" }) => {
  const getEngineeringBranches = () => [
    { value: 'cse', label: 'Computer Science Engineering', description: 'CSE' },
    { value: 'ece', label: 'Electronics & Communication Engineering', description: 'ECE' },
    { value: 'eee', label: 'Electrical & Electronics Engineering', description: 'EEE' },
    { value: 'me', label: 'Mechanical Engineering', description: 'ME' },
    { value: 'ce', label: 'Civil Engineering', description: 'CE' },
    { value: 'it', label: 'Information Technology', description: 'IT' },
    { value: 'che', label: 'Chemical Engineering', description: 'CHE' },
    { value: 'aero', label: 'Aeronautical Engineering', description: 'AERO' },
    { value: 'bio', label: 'Biotechnology', description: 'BT' },
    { value: 'auto', label: 'Automobile Engineering', description: 'AUTO' }
  ];

  const getManagementBranches = () => [
    { value: 'mba-finance', label: 'MBA - Finance', description: 'Master of Business Administration in Finance' },
    { value: 'mba-marketing', label: 'MBA - Marketing', description: 'Master of Business Administration in Marketing' },
    { value: 'mba-hr', label: 'MBA - Human Resources', description: 'Master of Business Administration in HR' },
    { value: 'mba-operations', label: 'MBA - Operations', description: 'Master of Business Administration in Operations' },
    { value: 'mba-it', label: 'MBA - Information Technology', description: 'Master of Business Administration in IT' },
    { value: 'mba-general', label: 'MBA - General Management', description: 'Master of Business Administration - General' }
  ];

  const getPolytechnicBranches = () => [
    { value: 'diploma-cse', label: 'Diploma in Computer Science', description: 'CSE Diploma' },
    { value: 'diploma-ece', label: 'Diploma in Electronics & Communication', description: 'ECE Diploma' },
    { value: 'diploma-eee', label: 'Diploma in Electrical Engineering', description: 'EEE Diploma' },
    { value: 'diploma-me', label: 'Diploma in Mechanical Engineering', description: 'ME Diploma' },
    { value: 'diploma-ce', label: 'Diploma in Civil Engineering', description: 'CE Diploma' },
    { value: 'diploma-auto', label: 'Diploma in Automobile Engineering', description: 'AUTO Diploma' }
  ];

  const getBranchOptions = () => {
    if (examType === 'cat') {
      return getManagementBranches();
    } else if (examType === 'polycet') {
      return getPolytechnicBranches();
    } else {
      return getEngineeringBranches();
    }
  };

  const getLabel = () => {
    if (examType === 'cat') return 'Preferred Specializations';
    if (examType === 'polycet') return 'Preferred Diploma Courses';
    return 'Preferred Engineering Branches';
  };

  const getDescription = () => {
    if (examType === 'cat') return 'Select MBA specializations you are interested in';
    if (examType === 'polycet') return 'Select diploma courses you want to pursue';
    return 'Select engineering branches you are interested in';
  };

  return (
    <div className={className}>
      <Select
        label={getLabel()}
        description={getDescription()}
        options={getBranchOptions()}
        value={selectedBranches}
        onChange={onBranchChange}
        placeholder="Select preferred branches"
        multiple
        searchable
        clearable
      />
    </div>
  );
};

export default BranchSelector;