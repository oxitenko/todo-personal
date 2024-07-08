import React from "react";
import styles from "./Loader.module.css"

const Loader: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.lds_spinner}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loader;