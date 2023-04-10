import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'

const UniversityList = () => {
    const [universities, setUniversities] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUniversity, setSelectedUniversity] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://universities.hipolabs.com/search?country=Pakistan',
            );
            setUniversities(result.data);
        };
        fetchData();
    }, []);

    const filteredUniversities = universities.filter((university) =>
        university.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleShowDetailsClick = (university) => {
        setSelectedUniversity(university);
    };

    const handleCloseDetailsClick = () => {
        setSelectedUniversity(null);
    };

    return (
        <div className="university-list">
            <h1 className="university-list__heading">Universities List of Pakistan</h1>
            <input
                type="text"
                placeholder="Search universities"
                value={searchQuery}
                onChange={handleSearchInputChange}
            />
            <ul className="university-list__list">
                {filteredUniversities.map((university) => (
                    <li className="university-list__item" key={university.alpha_two_code}>
                        <span>{university.name}</span>
                        <button onClick={() => handleShowDetailsClick(university)}>
                            Show Details
                        </button>
                    </li>
                ))}
            </ul>
            {selectedUniversity && (
                <div className="university-details">
                    <h2 className="university-details__heading">{selectedUniversity.name}</h2>
                    <button className="university-details__close" onClick={handleCloseDetailsClick}>
                        Close
                    </button>
                    <ul className="university-details__list">
                        <li>
                            <strong>Country:</strong> {selectedUniversity.country}
                        </li>
                        <li>
                            <strong>Website:</strong>{' '}
                            <a href={selectedUniversity.web_pages[0]} target="_blank" rel="noopener noreferrer">
                                {selectedUniversity.web_pages[0]}
                            </a>
                        </li>
                        <li>
                            <strong>Domains:</strong> {selectedUniversity.domains.join(', ')}
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UniversityList;
