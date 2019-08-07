import React from 'react';
import { withStyles } from '@material-ui/styles';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Interests from './Interests';

const styles = theme => ({
    root: {
        textAlign: 'center'
    },
    title: {
        marginBottom: theme.spacing(4),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    button: {
        margin: '0 auto'
    }
});

class QuizDialog extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            open: 'true'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]: value});
    }

    handleConfirm(e) {

    }

    handleClose = () => {
        this.setState({'open': false});
    };

    DialogTitle = withStyles(styles)(props => {
        const { children, classes, onClose } = props;
        return (
            <MuiDialogTitle disableTypography className={classes.root}>
                <Typography variant="h6">{children}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
        );
    });

    DialogContent = withStyles(theme => ({
        root: {
            padding: theme.spacing(2),
        },
    }))(MuiDialogContent);

    DialogActions = withStyles(theme => ({
        root: {
            margin: 0,
            padding: theme.spacing(1),
            marginBottom: '2rem'
        },
    }))(MuiDialogActions);

    componentDidMount = async () => {

    };

    render() {
        const { classes } = this.props;

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open} maxWidth={'md'}>
                <this.DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                    Select your interests:
                </this.DialogTitle>
                <this.DialogContent>
                    <Interests />
                </this.DialogContent>
                <this.DialogActions>
                    <Button onClick={this.handleClose} color="primary" className={classes.button}>
                        Done!
                    </Button>
                </this.DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = state => ({
    userStore: state.UserStore
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {

        },
        dispatch
    );
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(QuizDialog);