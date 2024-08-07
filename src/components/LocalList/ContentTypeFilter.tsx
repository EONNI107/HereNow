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

function ContentTypeFilter(props: ContentTypeFilterProps): React.ReactElement {
  const { selectedContentType, onContentTypeChange } = props;

  return (
    <div className="text-sm border-solid flex justify-center overflow-x-auto whitespace-nowrap mb-4 px-4">
      {contentTypes.map((type) => (
        <button
          key={type.id}
          className={`px-4 py-2 mr-2 rounded-full border-[2px] ${
            selectedContentType === type.id
              ? 'border-blue4 bg-blue0 font-semibold text-main'
              : 'border-gray8 bg-white font-regular text-sub1'
          }`}
          onClick={() => onContentTypeChange(type.id)}
        >
          {type.name}
        </button>
      ))}
    </div>
  );
}

export default ContentTypeFilter;
