type InputFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

function TitleInput({ value, onChange, placeholder }: InputFieldProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required
      className="input no-focus placeholder-bold text-24"
    />
  );
}

export default TitleInput;
