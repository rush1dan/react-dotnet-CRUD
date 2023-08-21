import React from 'react'
import styles from '../styles/studentform.module.css'

export const StudentForm = (props) => {
    return (
        <div className={styles.page}>
            <div className={styles.modal}>
                <form action="#" className={styles.form} onSubmit={props.onSubmit}>
                    <div className={styles.formInput}>
                        <div className={styles.leftDiv}>
                            <input name='name' value={props.studentData.name} placeholder='Name' className={styles.inputField} />
                            <input name='age' value={props.studentData.name} placeholder='Age' className={styles.inputField} />
                            <input name='inClass' value={props.studentData.name} placeholder='Class' className={styles.inputField} />
                            <input name='grades' value={props.studentData.name} placeholder='Grades' className={styles.inputField} />
                        </div>
                        <div className={styles.rightDiv}>
                            <div className={styles.image}>
                                <img src="" alt="" />
                            </div>
                            <label className={styles.chooseImage}>
                                <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
                                Choose File
                            </label>
                        </div>
                    </div>
                    <button type='submit' className={styles.submit}>Submit</button>
                </form>
                <button className={styles.close}>
                    &times;
                </button>
            </div>
        </div>
    )
}
