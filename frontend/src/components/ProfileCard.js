import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useTranslation } from 'react-i18next';
import Input from './Input'
const ProfileCard = (props) => {
    const [inEditMode, setInEditMode] = useState(false);
    const [updatedDisplayName, setUpdatedDisplayName] = useState();
    const { username: loggedInUsername } = useSelector(store => ({ username: store.username }));
    const routeParams = useParams();

    const { t } = useTranslation();
    const { user } = props;
    const { username, displayName, image } = user;

    useEffect(() => {
        if(!inEditMode){
            setUpdatedDisplayName(undefined);
        }else{
            setUpdatedDisplayName(displayName);
        }
    }, [inEditMode, displayName])


    const pathUsername = routeParams.username;

    let message = "We cannot edit";
    if (pathUsername === loggedInUsername) {
        message = "We can edit";
    }

    const onClickSave = () => {
        console.log(updatedDisplayName);
    }
    return (
        <div className="card  text-center">
            <div className="card-header">
                <ProfileImageWithDefault
                    className="rounded-circle shadow"
                    width="200"
                    height="200"
                    alt={`${username} profile`}
                    image={image}
                />
            </div>
            <div className="card-body">
                {!inEditMode &&
                    <>
                        <h5>
                            {displayName}@{username}
                        </h5>
                        <button className="btn btn-success d-inline-flex" onClick={() => setInEditMode(true)}>
                            <span className="material-icons">edit</span>{t('Edit')}
                        </button>
                    </>
                }
                {inEditMode && (
                    <div>
                        <Input
                            label={t("Change Display Name")}
                            defaultValue={displayName}
                            onChange={(event) => { setUpdatedDisplayName(event.target.value) }}
                        />
                        <div>
                            <button className="btn btn-secondary d-inline-flex" onClick={onClickSave}>
                                <span className="material-icons">save</span>{t('Save')}
                            </button>
                            <button className="btn btn-danger d-inline-flex ms-1" onClick={() => setInEditMode(false)}>
                                <span className="material-icons">close</span>{t('Cancel')}
                            </button>
                        </div>
                    </div>
                )

                }
            </div>
        </div>
    )
}

export default ProfileCard;