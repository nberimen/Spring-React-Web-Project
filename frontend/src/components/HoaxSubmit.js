import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux"
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import { postHoax } from "../api/apiCalls";
import { useApiProgress } from "../shared/ApiProgress";
import ButtonWithProgress from "./ButtonWithProgress";
const HoaxSubmit = () => {
    const { image } = useSelector((store) => ({ image: store.image }));
    const [focused, setFocused] = useState(false);
    const [hoax, setHoax] = useState('');
    const [errors, setErrors] = useState({});
    const { t } = useTranslation();

    useEffect(() => {
        if (!focused) {
            setHoax('');
            setErrors({});
        }
    }, [focused])

    useEffect(() => {
        setErrors({});
    }, [hoax])
    const onClickHoaxify = async () => {
        const body = {
            content: hoax
        }
        try {
            await postHoax(body);
            setFocused(false);
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
            }
        }
    }

    const pendingApiCall = useApiProgress('post', '/api/1.0/hoaxes');

    let textAreaClass = 'form-control';
    if (errors.content) {
        textAreaClass += ' is-invalid';
    }
    return (
        <div className="card p-1 flex-row">
            <ProfileImageWithDefault
                className="rounded-circle me-1"
                image={image}
                width="32"
                height="32"
            />
            <div className="flex-fill">
                <textarea
                    className={textAreaClass}
                    rows={focused ? '3' : '1'}
                    onFocus={() => setFocused(true)}
                    onChange={(event) => setHoax(event.target.value)}
                    value={hoax}
                />
                <div className="invalid-feedback">{errors.content} </div>
                {focused && (
                    <div className="text-end mt-1">
                        <ButtonWithProgress
                            className="btn btn-primary"
                            onClick={onClickHoaxify}
                            text="Hoaxify"
                            pendingApiCall={pendingApiCall}
                            disabled={pendingApiCall}
                        />

                        <button
                            className="btn btn-danger d-inline-flex ms-1"
                            onClick={() => setFocused(false)}
                            disabled={pendingApiCall}
                        >
                            <span className="material-icons">close</span>{t('Cancel')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default HoaxSubmit
