import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../dataContext";
import "./groupDetails.css";

const GroupDetails = () => {
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
        No se encontraron datos de {groupName} {console.log(groupName)}
      </div>
    );
  }

  const groupData = data.filter((item) => item.group_name === groupName);

  const filteredGroupData = groupData.filter((attack) => {
    return attack.post_title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="group-details">
      <h2>Ataques del grupo: <span style={{textTransform: 'capitalize'}}>{groupName}</span></h2>
      <div>
        <input
          type="text"
          className="search-input"
          placeholder="Buscar compañía..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="attacks-container">
        {filteredGroupData.length > 0 ? (
          filteredGroupData.map((attack, index) => (
            <div className="attack-card" key={index}>
              <h3>{attack.post_title}</h3>
              <p>Fecha de publicación: {attack.published}</p>
              <p>Descripción: {attack.description}</p>
            </div>
          ))
        ) : (
          <p> No se han encontrado resultados </p>
        )}
      </div>
    </div>
  );
};

export default GroupDetails;
