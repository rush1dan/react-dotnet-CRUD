import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/studentform.module.css'

export const StudentForm = (props) => {
    const formRef = useRef(null);
    function handleFormSubmit(event) {
        event.preventDefault();
        const formData = { "id": props.studentData.id };
        for (let i = 0; i < event.target.length - 1; i++) {
            formData[event.target[i].name] = event.target[i].value;
        }
        formData.img = inputImage ? URL.createObjectURL(inputImage) : null;
        props.onSubmit.submitFunc(formData);
        formRef.current?.reset();
        props.onClose();
    }

    const [inputImage, setInputImage] = useState(null);
    useEffect(() => {
        if (props.studentData.img) {
            setInputImage(props.studentData.img);
        }
    }, [])

    return (
        <div className={styles.page}>
            <div className={styles.modal}>
                <form action="#" className={styles.form} onSubmit={(e) => handleFormSubmit(e)} ref={formRef}>
                    <div className={styles.formInput}>

                        {/* Form input div */}
                        <div className={styles.leftDiv}>
                            <input name='name' type='text' defaultValue={Object.keys(props.studentData).length ? props.studentData.name : ''}
                                placeholder='Name' className={styles.inputField} required />
                            <input name='age' type='number' min={0} defaultValue={Object.keys(props.studentData).length ? props.studentData.age : ''}
                                placeholder='Age' className={styles.inputField} required />
                            <input name='inClass' type='number' min={0} defaultValue={Object.keys(props.studentData).length ? props.studentData.inClass : ''}
                                placeholder='Class' className={styles.inputField} required />
                            <input name='grades' type='text' maxLength={2} defaultValue={Object.keys(props.studentData).length ? props.studentData.grades : ''}
                                placeholder='Grades' className={styles.inputField} required />
                        </div>

                        {/* Image upload div */}
                        <div className={styles.rightDiv}>
                            <div >
                                <img src={inputImage ? URL.createObjectURL(inputImage) : "/dp_placeholder.png"} alt="" className={styles.image} />
                            </div>
                            <div className={styles.chooseImage}>
                                <label className={styles.chooseImageButton}>
                                    <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg"
                                        defaultValue={inputImage}
                                        onChange={e => setInputImage(e.target.files[0])} />
                                    Choose File
                                </label>
                                <p className={styles.chooseImageFile}>
                                    {
                                        inputImage?.name
                                    }
                                </p>
                            </div>
                        </div>
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
