import React from 'react';
import Input from '../../../components/ui/Input';

const RankInput = ({ rank, onRankChange, examType, error, className = "" }) => {
  const getPlaceholder = () => {
    switch (examType) {
      case 'jee-main':
        return 'Enter your JEE Main rank (1-1200000)';
      case 'jee-advanced':
        return 'Enter your JEE Advanced rank (1-40000)';
      case 'eapcet':
        return 'Enter your EAPCET rank (1-200000)';
      case 'ecet':
        return 'Enter your ECET rank (1-50000)';
      case 'polycet':
        return 'Enter your POLYCET rank (1-100000)';
      case 'cat':
        return 'Enter your CAT percentile (0-100)';
      default:
        return 'Enter your rank';
    }
  };

  const getLabel = () => {
    return examType === 'cat' ? 'CAT Percentile' : 'Entrance Exam Rank';
  };

  const getValidationProps = () => {
    if (examType === 'cat') {
      return { min: 0, max: 100, step: 0.01 };
    }
    
    const maxRanks = {
      'jee-main': 1200000,
      'jee-advanced': 40000,
      'eapcet': 200000,
      'ecet': 50000,
      'polycet': 100000
    };

    return { min: 1, max: maxRanks?.[examType] || 1000000 };
  };

  return (
    <div className={className}>
      <Input
        type="number"
        label={getLabel()}
        placeholder={getPlaceholder()}
        value={rank}
        onChange={(e) => onRankChange(e?.target?.value)}
        error={error}
        required
        {...getValidationProps()}
      />
    </div>
  );
};

export default RankInput;