import React from 'react'
import styles from '../styles/studentlist.module.css'

export const StudentList = (props) => {
    const displayStudents = []

    props.students.forEach(element => {
        let modifiedRecord = { ...element };
        delete modifiedRecord.id;
        displayStudents.push(modifiedRecord);
    });

    const studentPropKeys = displayStudents.length > 0 ? Object.keys(displayStudents[0]) : [];

    function formatHeadingFromKey(key) {
        let moddedKey = key;
        if (moddedKey.toLowerCase().includes("class"))
        {
            moddedKey = "class";
        }
        moddedKey = moddedKey.charAt(0).toUpperCase() + moddedKey.slice(1);
        return moddedKey;
    }

    return (
        <div className={styles.container}>
            <table className={styles.studentTable}>
                <thead>
                    <tr>
                        {
                            studentPropKeys.map((key, index) => {
                                const formattedHeading = formatHeadingFromKey(key);
                                return (
                                    <th key={index} className={styles.cellHeading}>
                                        {formattedHeading}
                                    </th>
                                )
                            })
                        }
                        <th className={styles.cellHeading}></th>
                        <th className={styles.cellHeading}></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        displayStudents.map((student, index) => {
                            return (
                                <tr key={index}>
                                    {
                                        studentPropKeys.map((key, index) => {
                                            return (
                                                <td key={index} className={styles.cellData}>
                                                    {student[key]}
                                                </td>
                                            )
                                        })
                                    }
                                    <td className={styles.cellData}>
                                        <button className={styles.edit}>
                                            Edit                                            
                                        </button>
                                    </td>
                                    <td className={styles.cellData}>
                                        <button className={styles.delete}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
