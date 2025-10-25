import React from 'react';
import Select from '../../../components/ui/Select';

const ExamTypeSelector = ({ selectedExam, onExamChange, className = "" }) => {
  const examOptions = [
    { value: 'jee-main', label: 'JEE Main', description: 'Joint Entrance Examination - Main' },
    { value: 'jee-advanced', label: 'JEE Advanced', description: 'Joint Entrance Examination - Advanced' },
    { value: 'eapcet', label: 'EAPCET', description: 'Engineering, Agriculture & Pharmacy Common Entrance Test' },
    { value: 'ecet', label: 'ECET', description: 'Engineering Common Entrance Test' },
    { value: 'polycet', label: 'POLYCET', description: 'Polytechnic Common Entrance Test' },
    { value: 'cat', label: 'CAT', description: 'Common Admission Test' }
  ];

  return (
    <div className={className}>
      <Select
        label="Select Entrance Exam"
        description="Choose the exam you appeared for"
        options={examOptions}
        value={selectedExam}
        onChange={onExamChange}
        placeholder="Select your exam"
        required
        searchable
      />
    </div>
  );
};

export default ExamTypeSelector;