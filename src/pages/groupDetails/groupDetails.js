import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../dataContext";
import { useTranslation } from "react-i18next";
import TranslationToggle from "../../components/TranslationToggle";
import "./groupDetails.css";

const GroupDetails = () => {
  const { t } = useTranslation();
  const { groupName } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  const data = useData();
  console.log("Datos>");
  console.log("------------");
  console.log(data);
  console.log("----------");

  if (!data) {
    return (
      <div>
        {t("details_no_data")} {groupName} {console.log(groupName)}
      </div>
    );
  }

  const groupData = data.filter((item) => item.group_name === groupName);

  const filteredGroupData = groupData.filter((attack) => {
    return attack.post_title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="group-details">
      <TranslationToggle />
      <h2>
        {t("details_title")}:{" "}
        <span style={{ textTransform: "capitalize" }}>{groupName}</span>
      </h2>
      <div>
        <input
          type="text"
          className="search-input"
          placeholder={t("details_search")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="attacks-container">
        {filteredGroupData.length > 0 ? (
          filteredGroupData.map((attack, index) => (
            <div className="attack-card" key={index}>
              <h3>{attack.post_title}</h3>
              <p>
                {t("details_div_date")}: {attack.published}
              </p>
              <p>
                {t("details_div_description")}: {attack.description}
              </p>
            </div>
          ))
        ) : (
          <p> {t("details_search_no_results")} </p>
        )}
      </div>
    </div>
  );
};

export default GroupDetails;
