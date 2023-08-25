import React, { useEffect, useState } from 'react'
import styles from '../styles/studentlist.module.css'
import { deleteEntry, get, post, put } from '../apicalls'
import { StudentForm } from './StudentForm';
import { StateFeedback } from './StateFeedback';

export const DataState = { fail: -1, pending: 0, success: 1 };

export const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [formOpen, setFormOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [formFunctionObj, setFormFunctionObj] = useState({});

    const [fetchState, setFetchState] = useState(DataState.pending);
    const [stateMessage, setStateMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function fetchData(delay) {
        try {
            setFetchState(DataState.pending);
            setStateMessage("Fetching Students...");
            if (delay) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
            setStudents(await get());
            setFetchState(DataState.success);
            setStateMessage("Success");
        } catch (error) {
            setFetchState(DataState.fail);
            setStateMessage("Fetching Students Failed");
            console.log("Fetch Error: ", error);
            setErrorMessage(error.message);
        }
    }

    useEffect(() => {
        fetchData(2000);
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

    async function postData(data, delay) {
        try {
            setFetchState(DataState.pending);
            setStateMessage("Adding Student...");
            if (delay) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
            const response = await post(data);
            setFetchState(DataState.success);
            setStateMessage("Success");
            console.log("Post Response: ", response);
            await fetchData();
        }
        catch (error) {
            setFetchState(DataState.fail);
            setStateMessage("Adding Student Failed");
            console.log("Post Error: ", error);
            setErrorMessage(error.message);
        }
    }

    async function editData(id, data, delay) {
        try {
            setFetchState(DataState.pending);
            setStateMessage("Editing Student...");
            if (delay) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
            const response = await put(id, data);
            console.log("Put Response: ", response);
            await fetchData();
        }
        catch (error) {
            setFetchState(DataState.fail);
            setStateMessage("Editing Student Failed");
            console.log("Put Error: ", error);
            setErrorMessage(error.message);
        }
    }

    async function deleteData(id, delay) {
        try {
            setFetchState(DataState.pending);
            setStateMessage("Deleting Student...");
            if (delay) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
            const response = await deleteEntry(id);
            console.log("Delete Response: ", response);
            await fetchData();
        }
        catch (error) {
            setFetchState(DataState.fail);
            setStateMessage("Deleting Student Failed");
            console.log("Delete Error: ", error);
            setErrorMessage(error.message);
        }
    }

    return (
        <div className={styles.container}>
            <StateFeedback status={fetchState} text={stateMessage} errorMsg={errorMessage} timeOut={2000} />

            {
                students.length > 0 ?
                    // When students are there:
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
                                                    <div className={fetchState == DataState.pending ? styles.buttonDisabled : ''}>
                                                        <button className={styles.edit} onClick={(e) => {
                                                            setFormData({ ...student });
                                                            setFormFunctionObj({ "submitFunc": (data) => editData(student["id"], data, 2000) });
                                                            setFormOpen(true);
                                                            console.log("Edit Student with ID: ", student["id"]);
                                                        }}>
                                                            Edit
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className={styles.cellData}>
                                                    <div className={fetchState == DataState.pending ? styles.buttonDisabled : ''}>
                                                        <button className={styles.delete} onClick={(e) => deleteData(student["id"], 2000)}>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div> :
                    // When no students:
                    (
                        fetchState != DataState.pending &&
                        <div className={styles.empty}>
                            No Students In Database
                        </div>
                    )
            }

            {/* Add Button */}
            <div className={fetchState == DataState.pending ? styles.buttonDisabled : ''}>
                <button className={styles.add} onClick={(e) => {
                    setFormData({});
                    setFormFunctionObj({ "submitFunc": (data) => postData(data, 2000) });
                    setFormOpen(true);
                }}>
                    ADD
                </button>
            </div>

            {
                formOpen &&
                <StudentForm studentData={{ ...formData }} onSubmit={formFunctionObj} onClose={() => { setFormOpen(false); setFormData({}); }} />
            }
        </div>
    )
}
