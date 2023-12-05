/* eslint-disable react/prop-types */
import { useState } from 'react';

import styles from './SearchModal.module.css'
export default function SearchModal({ closeModal }) {
    const [searchText, setSearchText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Search for: ${searchText}`);
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