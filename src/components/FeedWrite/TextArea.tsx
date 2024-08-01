type TextAreaProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

const TextArea = ({ value, onChange, placeholder }: TextAreaProps) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required
      className="textarea no-focus"
    />
  );
};

export default TextArea;
