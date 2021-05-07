import React, { useState } from "react";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import styles from "../styles/Home.module.css";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");

  const filteredCountries = countries.filter(
    ({ name, region, subregion }) =>
      name.toLowerCase().includes(keyword) ||
      region.toLowerCase().includes(keyword) ||
      subregion.toLowerCase().includes(keyword)
  );
  const handleKeywordChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.input}>
          <SearchInput
            placeholder="Filter by Name, Region or Subregion "
            onChange={handleKeywordChange}
          />
          <div className={styles.counts}>
            {" "}
            Found {filteredCountries.length} countries
          </div>
        </div>
      </div>
      <CountriesTable countries={filteredCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  return {
    props: { countries },
  };
};
