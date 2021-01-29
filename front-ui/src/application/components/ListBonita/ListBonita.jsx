import React from "react";
import PropTypes from "prop-types";

const ListBonita = ({ records, headerTitles }) =>
  !records ? (
    <h1>upps no records..</h1>
  ) : (
    <section>
      <div className="list-header-content">
        {headerTitles.map((title) => (
          <p key={`title-${title}`}>{title}</p>
        ))}
      </div>
      <ul>
        {records.map((items, index) => (
          <li key={`list-${index}`}>
            <div className="list-item">
              {Object.values(items).map((itemValue, index) => (
                <div key={`${index}${itemValue}`}>
                  <span> {headerTitles[index]}:</span> {itemValue}{" "}
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );

ListBonita.propTypes = {
  records: PropTypes.arrayOf(PropTypes.any),
  headerTitles: PropTypes.arrayOf(PropTypes.string),
};

ListBonita.defaultProps = {
  records: null,
  headerTitles: null,
};

export default ListBonita;
