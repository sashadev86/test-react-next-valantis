import Select from "react-select";

interface Option {
  value: string;
  label: string;
}

interface FilterProps {
  options: Option[];
  name: string;
  placeholder: string;
  onSelect: (value: string, name: string) => void;
}

const Filter = ({ options, name, placeholder, onSelect }: FilterProps) => {
  const handleChange = (selectedOption: Option | null) => {
    if (selectedOption) {
      onSelect(selectedOption.value, name);
    } else {
      onSelect("", name);
    }
  };

  return (
    <Select
      className="basic-single max-w-[300px] w-full"
      instanceId={name}
      inputId={name}
      name={name}
      options={options}
      isClearable={true}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default Filter;
