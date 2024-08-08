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
      className="textarea no-focus text-lg font-normal mt-8 bg-gray0 w-full h-full resize-none"
      style={{ minHeight: 'calc(100vh - 336px)' }}
    />
  );
}

export default ContentInput;
