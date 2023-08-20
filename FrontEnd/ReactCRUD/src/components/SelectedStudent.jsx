import React from 'react'
import styles from '../styles/selectedstudent.module.css'

export const SelectedStudent = (props) => {
    //const studentKeys = Object.keys(props.student)
    return (
        <div className={styles.container}>
            {/* Selected Student DP */}
            <div className={styles.studentImageContainer}>
                <img src="/vite.svg" alt="student img" className={styles.studentImage} />
            </div>

            {/* Selected Student Details
            <div className={styles.detailsContainer}>
                {
                        studentKeys.map((key, index) => {
                            return (
                                <div key={index} className={styles.detail}>
                                    <p>{`${key}:`}</p>
                                    <p>{ props.student.key }</p>
                                </div>
                            )
                        })
                }
            </div> */}
        </div>
    )
}
