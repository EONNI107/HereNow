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
      className="input no-focus placeholder-bold text-2xl px-2 py-4 bg-gray0 xl:text-[2.5vw] xl:px-[1.7vw] xl:py-[3.3vw]"
    />
  );
}

export default TitleInput;
