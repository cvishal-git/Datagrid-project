import './Checkbox.css';

interface CheckboxProps {
  checked: boolean;
  intermediate?: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const Checkbox = ({
  checked,
  intermediate,
  onChange,
  label,
}: CheckboxProps) => {
  return (
    <label className="checkbox-container">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span
        className={`checkbox-custom ${intermediate ? 'intermediate' : ''}`}
      ></span>
      {label && <span className="checkbox-label">{label}</span>}
    </label>
  );
};
