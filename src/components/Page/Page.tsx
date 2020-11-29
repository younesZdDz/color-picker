import React, { Suspense, useContext, useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import { AuthContext, SetAuthContext } from '../../contexts/auth.context';
import ErrorBoundary from '../ErrorBoundary';

import './style.css';

interface Props {
    title: string;
    description: string;
    errorImage: string;
    fallback: NonNullable<React.ReactNode>;
    requireLogin: boolean;
}
const Page: React.FC<Props> = ({ title, description, errorImage, fallback, children, requireLogin }) => {
    const auth = useContext(AuthContext);
    const setAuth = useContext(SetAuthContext);
    const [isMounting, setIsMounting] = useState(true);

    useEffect(() => {
        const fetchAuth = async () => {
            const res = await axios.get(`${config.API_URI}/api/v1/auth/current_user`, { withCredentials: true });
            console.log(res);

            if (res.data && setAuth) {
                setAuth({ ...res.data, isAuth: true });
                console.log(auth);
            }
            setIsMounting(false);
        };
        fetchAuth();
    }, []);
    if (!isMounting && requireLogin && !auth.isAuth) {
        return <Redirect to="/auth" />;
    }
    const content = isMounting ? (
        [fallback]
    ) : (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Helmet>
            <ErrorBoundary errorImage={errorImage}>
                <Suspense fallback={fallback}>
                    <section className="section">{children}</section>;
                </Suspense>
            </ErrorBoundary>
        </>
    );

    return <div className="page">{content}</div>;
};

export default Page;
