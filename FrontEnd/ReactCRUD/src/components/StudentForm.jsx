import React, { useRef } from 'react'
import styles from '../styles/studentform.module.css'

export const StudentForm = (props) => {
    const formRef = useRef(null);
    function handleFormSubmit(event) {
        event.preventDefault();
        const formData = { "id": props.studentData.id };
        //Get all fields except tha last one which is the image
        for (let i = 0; i < event.target.length - 1; i++) {         
            formData[event.target[i].name] = event.target[i].value;
        }
        props.onSubmit.submitFunc(formData);
        formRef.current?.reset();
        props.onClose();
    }
    return (
        <div className={styles.page}>
            <div className={styles.modal}>
                <form action="#" className={styles.form} onSubmit={(e) => handleFormSubmit(e)} ref={formRef}>
                    <div className={styles.formInput}>
                        
                        {/* Form input div */}
                        <div className={styles.leftDiv}>
                            <input name='name' type='text' defaultValue={props.studentData ? props.studentData.name : ''}
                                placeholder='Name' className={styles.inputField} />
                            <input name='age' type='number' min={0} defaultValue={props.studentData ? props.studentData.age : ''}
                                placeholder='Age' className={styles.inputField} />
                            <input name='inClass' type='number' min={0} defaultValue={props.studentData ? props.studentData.inClass : ''}
                                placeholder='Class' className={styles.inputField} />
                            <input name='grades' type='text' maxLength={2} defaultValue={props.studentData ? props.studentData.grades : ''}
                                placeholder='Grades' className={styles.inputField} />
                        </div>

                        {/* Image upload div */}
                        {/* <div className={styles.rightDiv}>
                            <div className={styles.image}>
                                <img src="" alt="" />
                            </div>
                            <label className={styles.chooseImage}>
                                <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
                                Choose File
                            </label>
                        </div> */}
                    </div>
                    <button type='submit' className={styles.submit}>Submit</button>
                </form>
                <button className={styles.close} onClick={props.onClose}>
                    &times;
                </button>
            </div>
        </div>
    )
}
