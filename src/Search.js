import { useState } from "react";
import { udemyData } from "./constants/data.js";

import "./Search.css";

export const Search = ({ setSelectedResult }) => {
    const [topResults, setTopResults] = useState([]);

    const handleChange = event => {
        const searchTerm = event.target.value;
        // search the searchTerm in udemyData.results's "title"
        const searchResults = udemyData.results.filter(result => {
            return (
                result.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                result._class === "lecture"
            );
        });
        // sort the searchResults by closest match
        const topResults = searchResults.sort((a, b) => a.title.length - b.title.length);
        setTopResults(topResults);
    };

    const handleResultClick = result => {
        setTopResults([]);
        setSelectedResult(result);
    };

    return (
        <div>
            {/* on enter press, call handleResultClick */}
            <input
                type="search"
                placeholder="Search for..."
                onChange={handleChange}
                onKeyPress={event => {
                    if (event.key === "Enter") {
                        handleResultClick(topResults[0]);
                    }
                }}
            />
            <div className="search-results">
                {topResults.length > 0 && (
                    <ul>
                        {topResults.map(result => (
                            <li key={result.id}>
                                <span className="result" onClick={() => handleResultClick(result)}>
                                    {result.title}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Search;
