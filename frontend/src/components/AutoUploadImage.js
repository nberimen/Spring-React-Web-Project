import React from 'react'
import './AutoUploadImage.css'
const AutoUploadImage = (props) => {
    const { image, uploading } = props;
    return (
        <div style={{ position: 'relative' }}>
            <img className="img-thumbnail" src={image} alt="hoax-attachment" />
            <div className="overlay" style={{opacity: uploading ? 1 : 0}}>
                <div className="d-flex justify-content-center h-100">
                    <div className="spinner-border text-light m-auto">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AutoUploadImage
