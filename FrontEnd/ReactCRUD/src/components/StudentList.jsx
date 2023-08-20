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
            <table>
                <thead>
                    <tr>
                        {
                            studentPropKeys.map((key, index) => {
                                const formattedHeading = formatHeadingFromKey(key);
                                return (
                                    <th key={index}>
                                        {formattedHeading}
                                    </th>
                                )
                            })
                        }
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
                                                <td>
                                                    {student[key]}
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
