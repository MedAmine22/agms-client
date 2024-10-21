import React, { useState } from "react";
import FrenchFlag from "../../assets/img/fr.png";
import EnglishFlag from "../../assets/img/eng.png";
import ArabicFlag from "../../assets/img/ar.png";

const options = [
  { value: "fr", label: "Français", icon: FrenchFlag },
  { value: "en", label: "Anglais", icon: EnglishFlag },
  { value: "ar", label: "Arabe", icon: ArabicFlag },
];

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[1]); // Anglais par défaut

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    console.log("Langue sélectionnée :", option.value);
  };

  return (
    <div className="language-selector">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        <img src={selectedOption.icon} alt={selectedOption.label} className="flag" />
      </button>
      <div className={`language-options ${isOpen ? "open" : ""}`}>
        {options.map((option) => (
          <div
            key={option.value}
            className={`language-option ${selectedOption.value === option.value ? "active" : ""}`}
            onClick={() => handleChange(option)}
          >
            <img src={option.icon} alt={option.label} className="flag" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
