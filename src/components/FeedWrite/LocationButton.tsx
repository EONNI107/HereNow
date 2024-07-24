type LocationButtonProps = {
  location: string;
  setLocation: (value: string) => void;
};

const LocationButton = ({ location, setLocation }: LocationButtonProps) => {
  const handleAddLocation = () => {
    const loc = prompt('Enter the location:');
    if (loc) {
      setLocation(loc);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleAddLocation}
        className="btn self-start"
      >
        위치 추가하기
      </button>
      {location && <p>Location: {location}</p>}
    </>
  );
};

export default LocationButton;
