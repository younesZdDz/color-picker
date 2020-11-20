import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { WithStyles } from '@material-ui/core';
import classNames from 'classnames';
import styles from './styles';
interface Props extends WithStyles<typeof styles> {
    name: string;
    background: string;
    moreUrl?: string;
}
const ColorBox: React.FC<Props> = ({ name, background, moreUrl, classes }) => {
    const [copied, setCopied] = useState(false);
    useEffect(() => {
        if (copied === true) {
            setTimeout(() => setCopied(false), 1500);
        }
    }, [copied]);
    const changeCopyState = () => {
        setCopied(true);
    };

    return (
        <CopyToClipboard text={background} onCopy={changeCopyState}>
            <div style={{ background }} className={classes.ColorBox}>
                <div
                    style={{ background }}
                    className={classNames(classes.copyOverlay, {
                        [classes.showOverlay]: copied,
                    })}
                />
                <div
                    className={classNames(classes.copyMessage, {
                        [classes.showMessage]: copied,
                    })}
                >
                    <h1>copied!</h1>
                    <p className={classes.copyText}>{background}</p>
                </div>
                <div>
                    <div className={classes.boxContent}>
                        <span className={classes.colorName}>{name}</span>
                    </div>
                    <button type="button" className={classes.copyButton}>
                        Copy
                    </button>
                </div>
                {moreUrl && (
                    <Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
                        <span className={classes.seeMore}>MORE</span>
                    </Link>
                )}
            </div>
        </CopyToClipboard>
    );
};

export default React.memo(withStyles(styles)(ColorBox));
