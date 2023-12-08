/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import * as movieService from '../../services/movieService'
import styles from './SearchModal.module.css'
import Path from '../../paths';
import { useNavigate } from 'react-router-dom';

export default function SearchModal({ closeModal }) {
    const [searchText, setSearchText] = useState('');
    const [moviesData, setMoviesData] = useState([])
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            if (searchText === "") {
                return null;
            }
            const result = await movieService.getSearched(searchText);
            setMoviesData(result)
            console.log(result)
            navigate(Path.Search, { state: { moviesData: result } });
        } catch (error) {
            console.error('Error fetching search results:', error);
        }


        closeModal(false);
    };
    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContainer}>
                <div className={styles.titleCloseBtn}>
                    <button className={styles.xbtn} onClick={() => { closeModal(false); }}>
                        X
                    </button>
                </div>
                <form onSubmit={handleSubmit} className={styles.searchForm}>
                    <input
                        className={styles.searchInput}
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button className={styles.searchButton} type="submit">Search</button>
                </form>
            </div>
        </div>
    );

}