import React, { useEffect, useState } from 'react'
import styles from '../styles/studentlist.module.css'
import { get, post } from '../apicalls'

export const StudentList = () => {
    const [fetchError, setFetchError] = useState(null);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                setStudents(await get());
            } catch (error) {
                setFetchError(error);
            }
        }
        fetchData();
    }, []);

    const displayStudents = [];
    let studentPropKeys = [];

    function formatHeadingFromKey(key) {
        let moddedKey = key;
        if (moddedKey.toLowerCase().includes("class")) {
            moddedKey = "class";
        }
        moddedKey = moddedKey.charAt(0).toUpperCase() + moddedKey.slice(1);
        return moddedKey;
    }

    if (students.length > 0) {
        students.forEach(element => {
            let modifiedRecord = { ...element };
            delete modifiedRecord.id;
            displayStudents.push(modifiedRecord);
        });

        studentPropKeys = displayStudents.length > 0 ? Object.keys(displayStudents[0]) : [];
    }

    async function postData(data) {
        try {
            response = await post(data);
            console.log("Post Response: ", response);
        }
        catch (error) {
            console.log("Post Error: ", error);
        }
    }

    return (
        <div className={styles.container}>
            {
                fetchError &&
                <div>Error Fetching Data</div>
            }

            {
                students.length > 0 &&
                <div className={styles.tableContainer}>
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
                                        <tr key={index} className={styles.dataRow}>
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
            }

            {/* Add Button */}
            <div>
                <button className={styles.add} onClick={(e) => postData({
                    "name": "goku",
                    "age": 12,
                    "inClass": 5,
                    "grades": "A+"
                })}>
                    ADD
                </button>
            </div>
        </div>
    )
}
