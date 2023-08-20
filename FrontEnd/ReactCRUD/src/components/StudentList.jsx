import React from 'react'
import styles from '../styles/studentlist.module.css'

export const StudentList = (props) => {
    return (
        <div className={styles.container}>
            {
                props.students.map((student, index) => {
                    const studentProps = Object.keys(student)
                    return (
                        <div key={index} className={styles.studentDetails}>
                            {
                                studentProps.map((property, index) => {
                                    return (
                                        <div key={index} className={styles.property}>
                                            <p>
                                                <span className={styles.heading}>
                                                    {`${property}: `}
                                                </span>
                                                <span className={styles.desc}>
                                                    {student[property]}
                                                </span>
                                            </p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}
