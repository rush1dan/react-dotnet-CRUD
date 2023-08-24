import React, { useEffect, useState } from 'react'
import styles from '../styles/statefeedback.module.css'
import { DataState } from './StudentList'

export const StateFeedback = (props) => {
    const [hide, setHide] = useState(true);
    const [timeOutId, setTimeOutId] = useState(0);
    const [imgSrc, setImgSrc] = useState("");

    useEffect(() => {
        setHide(false);
        clearTimeout(timeOutId);

        if (props.timeOut) {
            setTimeOutId(setTimeout(() => setHide(true), props.timeOut));
        }

        switch (props.status) {
            case DataState.pending:
                setImgSrc("/loading.gif");
                break;
            case DataState.fail:
                setImgSrc("/cross.png");
                break;
            case DataState.success:
                setImgSrc("/success.svg");
                break;
            default:
                break;
        }
    }, [props.status])

    return (
        <>
            <div className={`styles.container ${hide ? styles.invisible : ''}`}>
                <div className={styles.flexContainer}>
                    <img src={imgSrc} alt="" className={styles.statusImg} />
                    <div className={styles.statusText}>
                        {props.text}
                    </div>
                </div>
                <p className={styles.errorMsg}>
                    {props.status == DataState.fail ? `Error: ${props.errorMsg}` : " "}
                </p>
            </div>
        </>
    )
}
