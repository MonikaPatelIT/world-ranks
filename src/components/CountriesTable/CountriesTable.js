import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import { useState } from "react";
import styles from "./CountriesTable.module.css";
import Link from "next/link";

const SortArrow = ({ direction }) => {
  return direction == "asc" ? (
    <div className={styles.heading_arrow}>
      <KeyboardArrowDown color="inherit" />
    </div>
  ) : (
    <div className={styles.heading_arrow}>
      <KeyboardArrowUp color="inherit" />
    </div>
  );
};

const orderBy = (direction, value, countries) => {
  if (direction === "asc")
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  else return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
};

const CountriesTable = ({ countries }) => {
  const [direction, setDirection] = useState("asc");
  const [value, setValue] = useState("name");

  const orderedCountries = orderBy(direction, value, countries);

  const switchDirection = () => {
    if (direction === "asc") {
      setDirection("desc");
    } else {
      setDirection("asc");
    }
  };

  const setValueAndDirection = (value) => {
    switchDirection(direction);
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
          <div className={styles.heading_flag}></div>
        <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection("name")}
        >
          <div>Name</div>
          <SortArrow direction={direction} />
        </button>
        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection("population")}
        >
          <div>Population</div>
          <SortArrow direction={direction} />
        </button>

        <button
          className={styles.heading_area}
          onClick={() => setValueAndDirection("area")}
        >
          <div>
            Area (km<sup>2</sup>)
          </div>
          <SortArrow direction={direction} />
        </button>

        <button
          className={styles.heading_gini}
          onClick={() => setValueAndDirection("gini")}
        >
          <div>Gini</div>
          <SortArrow direction={direction} />
        </button>
      </div>
      {orderedCountries.map((country, index) => (
        <Link href={`/country/${country.alpha3Code}`} key={index}>
          <div className={styles.row}>
            <div className={styles.flag}>
              <img src={country.flag} alt={country.name} />
            </div>
            <div className={styles.name}>{country.name}</div>
            <div className={styles.population}>{country.population}</div>
            <div className={styles.area}>{country.area || 0}</div>
            <div className={styles.gini}>{country.gini || 0} % </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CountriesTable;
