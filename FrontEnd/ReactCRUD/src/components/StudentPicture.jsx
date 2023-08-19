import React from 'react'
import styles from '../styles/studentimage.module.css'; 

export const StudentPicture = (props) => {
    return (
        <div className={styles.studentImageContainer}>
            <div className={styles.studentImage}>
                <img src={props.src} alt="student img" />
            </div>
        </div>
    )
}
