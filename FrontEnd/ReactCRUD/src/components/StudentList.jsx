import React, { useEffect, useState } from 'react'
import styles from '../styles/studentlist.module.css'
import { deleteEntry, get, post, put } from '../apicalls'
import { StudentForm } from './StudentForm';

export const StudentList = () => {
    const [fetchError, setFetchError] = useState(null);
    const [students, setStudents] = useState([]);
    const [formOpen, setFormOpen] = useState(false);
    const [formData, setFormData] = useState({});

    async function fetchData() {
        try {
            setStudents(await get());
        } catch (error) {
            setFetchError(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    function formatStudentDisplayData(studentData) {
        const moddedData = { ...studentData };
        delete moddedData.id;
        return moddedData;
    }

    function formatHeadingFromKey(key) {
        let moddedKey = key;
        if (moddedKey.toLowerCase().includes("class")) {
            moddedKey = "class";
        }
        moddedKey = moddedKey.charAt(0).toUpperCase() + moddedKey.slice(1);
        return moddedKey;
    }

    let studentDataHeadings = [];
    if (students.length > 0) {
        studentDataHeadings = Object.keys(formatStudentDisplayData(students[0])).map((key) => formatHeadingFromKey(key));
    }

    async function postData(data) {
        try {
            const response = await post(data);
            console.log("Post Response: ", response);
            await fetchData();
        }
        catch (error) {
            console.log("Post Error: ", error);
        }
    }

    async function editData(id, data) {
        try {
            const response = await put(id, data);
            console.log("Post Response: ", response);
            await fetchData();
        }
        catch (error) {
            console.log("Post Error: ", error);
        }
    }

    async function deleteData(id) {
        try {
            const response = await deleteEntry(id);
            console.log("Post Response: ", response);
            await fetchData();
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
                                    studentDataHeadings.map((heading, index) => {
                                        return (
                                            <th key={index} className={styles.cellHeading}>
                                                {heading}
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
                                students.map((student, index) => {
                                    const keys = Object.keys(formatStudentDisplayData(student));
                                    return (
                                        <tr key={index} className={styles.dataRow}>
                                            {
                                                keys.map((key, index) => {
                                                    return (
                                                        <td key={index} className={styles.cellData}>
                                                            {student[key]}
                                                        </td>
                                                    )
                                                })
                                            }
                                            <td className={styles.cellData}>
                                                <button className={styles.edit} onClick={(e) => {
                                                    editData(student["id"], {
                                                        "id": student["id"],
                                                        "name": "Roshi",
                                                        "age": 69,
                                                        "inClass": 19,
                                                        "grades": "F"
                                                    });
                                                    console.log("Edit Student with ID: ", student["id"]);
                                                }}>
                                                    Edit
                                                </button>
                                            </td>
                                            <td className={styles.cellData}>
                                                <button className={styles.delete} onClick={(e) => deleteData(student["id"])}>
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
                <button className={styles.add} onClick={(e) => {
                    setFormData({});
                    setFormOpen(true);
                }}>
                    ADD
                </button>
            </div>

            {
                formOpen &&
                <StudentForm studentData={ ...formData } />
            }
        </div>
    )
}
