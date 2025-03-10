export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#1F1F27",
    borderColor: state.isFocused ? "#734AEF" : "#2E2E3A",
    borderRadius: "8px",
    boxShadow: state.isFocused ? "0 0 0 1px #734AEF" : "none",
    "&:hover": {
      borderColor: "#734AEF",
    },
    padding: "4px",
    minHeight: "40px",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#1F1F27",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
    zIndex: 10,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#734AEF"
      : state.isFocused
      ? "rgba(115, 74, 239, 0.2)"
      : "#1F1F27",
    color: "#fff",
    cursor: "pointer",
    "&:active": {
      backgroundColor: "#734AEF",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#734AEF",
    "&:hover": {
      color: "#8F6FF7",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#888",
  }),
  input: (provided) => ({
    ...provided,
    color: "#fff",
  }),
};
