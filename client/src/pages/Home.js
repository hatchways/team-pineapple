import React from 'react';
import { withStyles } from '@material-ui/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';

const styles = theme => ({
    root: {
        textAlign: 'center',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    container: {
        display: 'grid',
        justifyItems: 'center',
        zIndex: '0'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridGap: '15px',
        justifyItems: 'center'
    },
    card: {
        height: '55vh',
        width: '18vw',
        background: 'yellow'
    }
});

class Home extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    componentDidMount () {
    }

    render () {
        const { classes } = this.props;

        return (
            <div className={classes.container}>
                <div className={classes.grid}>
                    <Paper className={classes.card} />
                    <Paper className={classes.card} />
                    <Paper className={classes.card} />
                    <Paper className={classes.card} />
                    <Paper className={classes.card} />
                    <Paper className={classes.card} />
                    <Paper className={classes.card} />
                    <Paper className={classes.card} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userStore: state.UserStore
});

export default compose(withStyles(styles), connect(mapStateToProps))(Home);
