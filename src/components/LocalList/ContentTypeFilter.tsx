import React from 'react';

type ContentTypeFilterProps = {
  selectedContentType: string;
  onContentTypeChange: (contentType: string) => void;
};

const contentTypes = [
  { id: '12', name: '관광지' },
  { id: '14', name: '문화시설' },
  { id: '15', name: '행사' },
  { id: '39', name: '맛집' },
];

const ContentTypeFilter: React.FC<ContentTypeFilterProps> = ({
  selectedContentType,
  onContentTypeChange,
}) => {
  return (
    <div className="flex overflow-x-auto whitespace-nowrap mb-4 px-4">
      {contentTypes.map((type) => (
        <button
          key={type.id}
          className={`px-4 py-2 mr-2 rounded-full ${
            selectedContentType === type.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => onContentTypeChange(type.id)}
        >
          {type.name}
        </button>
      ))}
    </div>
  );
};

export default ContentTypeFilter;
