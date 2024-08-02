type InputFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

const InputField = ({ value, onChange, placeholder }: InputFieldProps) => {
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
};

export default InputField;
