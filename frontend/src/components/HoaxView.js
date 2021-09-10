import React from 'react'
import { Link } from 'react-router-dom';
import ProfileImageWithDefault from './ProfileImageWithDefault'
import { format } from 'timeago.js'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { deleteHoax } from '../api/apiCalls';
const HoaxView = (props) => {
    const loggedInUser = useSelector(store => store.username);
    const { hoax, onDeleteHoax } = props;
    const { user, content, timestamp, fileAttachment, id } = hoax;
    const { username, displayName, image } = user;

    const { i18n } = useTranslation();

    const onClickDelete = async () => {
        await deleteHoax(id); 
        onDeleteHoax(id);
    }



    const formatted = format(timestamp, i18n.language);

    const ownedByLoggedInUser = loggedInUser === username;


    return (
        <div className="card p-1">
            <div className="d-flex">
                <ProfileImageWithDefault
                    className="rounded-circle m-1"
                    image={image}
                    width="32"
                    height="32"
                />
                <div className="flex-fill m-auto ps-2">
                    <Link to={`/user/${username}`} className="text-dark text-decoration-none">
                        <h6 className="d-inline">
                            {displayName}@{username}
                        </h6>
                        <span> - </span>
                        <span>
                            {formatted}
                        </span>
                    </Link>
                </div>
                {ownedByLoggedInUser &&
                    (<button className="btn btn-delete-link btn-sm" onClick={onClickDelete}>
                        <span className="material-icons">
                            delete_outline
                        </span>
                    </button>)}
            </div>
            <div className="ps-5">
                {content}
            </div>
            {fileAttachment && (
                <div className="ps-5">
                    {fileAttachment.fileType.startsWith('image') && (
                        <img className="img-fluid" src={'images/attachments/' + fileAttachment.name} alt={content} />
                    )}
                    {!fileAttachment.fileType.startsWith('image') && (
                        <strong>Hoax has unknown attachment</strong>
                    )}
                </div>
            )}
        </div>
    )
}

export default HoaxView
