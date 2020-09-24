import React from 'react'
import Loading from '../Loading/Loading.component'
import ClearSharpIcon from '@material-ui/icons/ClearSharp';

function Preview({file, previewImage, cancelPreview}) {
    return (
        <div className="preview_box_block">
            <div className="preview__inner">
                <div className="preview__back">
                    <header className="preview__header">
                        <div className="preview__header_block">
                            <button className="preview__cancel_button" onClick={cancelPreview}>
                                <ClearSharpIcon/>
                            </button>
                            <div className="preview__heading">
                                Preview
                            </div>
                        </div>
                    </header>
                    <div className="preview__body">
                        <div className="first__portion">

                            <div className="preview_first__block">
                                <div className="preview__image_area__block">
                                    <div className="preview__image_area">
                                        {
                                            file?.type === "video/mp4"
                                            ?
                                                previewImage
                                                ?
                                                    <video className="preview__image" controls>
                                                        <source src={previewImage} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                :
                                                <Loading type="spinner-border text-success"/>
                                            :
                                                previewImage
                                                ?
                                                    <img src={previewImage} alt="" className="preview__image"/>
                                                :
                                                <Loading type="spinner-border text-success"/>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Preview
