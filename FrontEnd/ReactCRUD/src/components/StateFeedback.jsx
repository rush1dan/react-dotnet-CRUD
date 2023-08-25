import React, { useEffect, useState } from 'react'
import styles from '../styles/statefeedback.module.css'
import { DataState } from './StudentList'

export const StateFeedback = (props) => {
    const [hide, setHide] = useState(true);
    const [timeOutId, setTimeOutId] = useState(0);
    const [imgSrc, setImgSrc] = useState("");
    const [showDisclaimer, setShowDisclaimer] = useState(true);

    useEffect(() => {
        setHide(false);
        clearTimeout(timeOutId);

        if (props.timeOut && props.status != DataState.pending) {
            setTimeOutId(setTimeout(() => setHide(true), props.timeOut));
        }

        switch (props.status) {
            case DataState.pending:
                setImgSrc("/loading.gif");
                break;
            case DataState.fail:
                setImgSrc("/cross.png");
                if (showDisclaimer) { setShowDisclaimer(false); }
                break;
            case DataState.success:
                setImgSrc("/success.svg");
                if (showDisclaimer) { setShowDisclaimer(false); }
                break;
            default:
                break;
        }
    }, [props.status])

    return (
        <>
            <div className={`styles.container ${hide ? styles.invisible : ''}`}>
                {
                    showDisclaimer &&
                    <p className={styles.disclaimer}>
                        The api backend is hosted on render.com, where the machines in the free tier spin down after a duration of inactivity.
                        So, there may be an initial loading time of up to <span className={styles.loadtime}>30s</span> when first making the api request.
                        Subseqent requests are faster.
                    </p>
                }
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
