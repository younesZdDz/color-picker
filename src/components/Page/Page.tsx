import React, { Suspense, useContext } from 'react';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth.context';
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

    if (auth && requireLogin && !auth.isAuth) {
        return <Redirect to="/auth" />;
    }

    const content =
        auth === null ? (
            [fallback]
        ) : (
            <>
                {' '}
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
