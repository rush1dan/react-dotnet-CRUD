import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/studentform.module.css'
import { DataState } from './StudentList';
import { StateFeedback } from './StateFeedback';

export const StudentForm = (props) => {
    const formRef = useRef(null);

    const [formState, setFormState] = useState(DataState.none);

    async function uploadImage(imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData
            });
            return await response.json();
        }
        catch (error) {
            throw error;
        }
    }

    async function handleFormSubmit(event) {
        setFormState(DataState.pending);
        const formData = { "id": props.studentData.id };
        try {
            event.preventDefault();
            for (let i = 0; i < event.target.length - 1; i++) {
                formData[event.target[i].name] = event.target[i].value;
            }
            const imageUploadResponse = await uploadImage(inputImage);
            formData.img = imageUploadResponse.secure_url;
            setFormState(DataState.success);
        } catch (error) {
            console.log(error.message);
            setFormState(DataState.fail);
        }
        props.onSubmit.submitFunc(formData);
        formRef.current?.reset();
        closeForm();
    }

    function closeForm() {
        setFormState(DataState.none);
        props.onClose();
    }

    const [inputImage, setInputImage] = useState(null);
    const [inputImageSrc, setInputImageSrc] = useState("");
    useEffect(() => {
        if (props.studentData.img) {
            setInputImageSrc(props.studentData.img);
        }
    }, [])
    function handleImageSelection(imageFile) {
        //If image size greater than 100KB

        if (imageFile.size > 102400) {
            console.error(`Image of size ${imageFile.size}B Too Large. Please Select Image of size < 100KB`);
        }
        else {
            setInputImage(imageFile);
            setInputImageSrc(URL.createObjectURL(imageFile));
        }
    }

    const feedbackStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        translate: '-50% -50%',
    }

    return (
        <div className={styles.page}>
            <div className={styles.modal}>
                <StateFeedback status={formState} text={""} errorMsg={""} timeOut={0} style={feedbackStyle} />
                {
                    formState == DataState.none &&
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
                                    <img src={inputImageSrc ? inputImageSrc : (Object.keys(props.studentData).length ? null : "/dp_placeholder.png")} alt="" className={styles.image} />
                                </div>
                                <div className={styles.chooseImage}>
                                    <label className={styles.chooseImageButton}>
                                        <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg"
                                            defaultValue={inputImage}
                                            onChange={e => handleImageSelection(e.target.files[0])} />
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
                }
                <button className={styles.close} onClick={e => closeForm()}>
                    &times;
                </button>
            </div>
        </div>
    )
}
