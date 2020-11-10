import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import PropType from 'prop-types';
import classNames from 'classnames';
import styles from './styles';

function ColorBox({ name, background, moreUrl, showingFullPalette, classes }) {
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
						[classes.showOverlay]: copied
					})}
				/>
				<div
					className={classNames(classes.copyMessage, {
						[classes.showMessage]: copied
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
				{showingFullPalette && (
					<Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
						<span className={classes.seeMore}>MORE</span>
					</Link>
				)}
			</div>
		</CopyToClipboard>
	);
}

ColorBox.propTypes = {
	name: PropType.string.isRequired,
	background: PropType.string.isRequired,
	moreUrl: PropType.string,
	showingFullPalette: PropType.bool.isRequired,
	classes: PropType.object.isRequired
};

export default withStyles(styles)(ColorBox);
