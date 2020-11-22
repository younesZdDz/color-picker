import classes from '*.module.css';
import React, { Suspense } from 'react';
import Helmet from 'react-helmet';
import ErrorBoundary from '../ErrorBoundary';

import './style.css';

interface Props {
    title: string;
    description: string;
    errorImage: string;
    fallback: NonNullable<React.ReactNode>;
}
const Page: React.FC<Props> = ({ title, description, errorImage, fallback, children }) => {
    return (
        <div className="page">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Helmet>
            <ErrorBoundary errorImage={errorImage}>
                <Suspense fallback={fallback}>
                    <section className="section">{children}</section>;
                </Suspense>
            </ErrorBoundary>
        </div>
    );
};

export default Page;
