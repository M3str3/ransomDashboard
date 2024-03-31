import React from "react";
import { useTranslation } from "react-i18next";

const TranslationToggle = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div style={{ position: "absolute", top: 20, right: 20, fontSize: "24px" }}>
      <button
        onClick={() => changeLanguage("es")}
        style={{
          border: "none",
          background: "none",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        🇪🇸
      </button>
      <button
        onClick={() => changeLanguage("en")}
        style={{ border: "none", background: "none", cursor: "pointer" }}
      >
        🇬🇧
      </button>
    </div>
  );
};

export default TranslationToggle;
