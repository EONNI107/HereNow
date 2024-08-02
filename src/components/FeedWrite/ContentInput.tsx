type TextAreaProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

function ContentInput({ value, onChange, placeholder }: TextAreaProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required
      className="textarea no-focus text-18"
    />
  );
}

export default ContentInput;
