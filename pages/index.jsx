import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from '../style.css'

export default withStyles(styles)(() => <h1 className={styles.blue}>Hello world</h1>)
