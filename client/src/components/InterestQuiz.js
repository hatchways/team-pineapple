import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Paper, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './InterestQuizStyle.css'

//component can be removed. Only used to visualize scripting. 
//functionality can be added or edited to fit UI code after PR'S are done

class InterestQuiz extends Component {
    constructor() {
        super()
        this.state = {
            interests: [],
        }
    }

    onCloseClick = () => {
        const username = this.props.location.pathname.split('/')[2];
        this.props.history.push(`/profile/${username}`);
    };

    appendValue = (e) => {
        let listOfInterests = this.state.interests
        if (listOfInterests.includes(e.target.value)) {
            listOfInterests = listOfInterests.filter(int => int !== e.target.value)
            this.setState({interests: listOfInterests}, () => {console.log(this.state.interests)})
        } else {
            listOfInterests.push(e.target.value)
            this.setState({interests: listOfInterests}, () => {console.log(this.state.interests)})
        }
    }

    sendInterests = async () => {
        try {
            const params = {
                interestsList: this.state.interests
            };
            const config = {
                'Content-Type': 'application.json'
            };
            let res = await axios.post('/save_interest_quiz', params, config);
        } catch (err) {
            console.log('interests not sent', err);
        }
    };

    render() {
        return (
            <Dialog
                    open={true}
                    onClose={this.handleClose}
                    aria-labelledby='form-dialog-title'
                    onClick={() => this.onCloseClick()}
                    className='dialog'
            >
                    <div onClick={e => e.stopPropagation()}>
                        <DialogTitle style={{ textAlign: 'center' }} id='form-dialog-title'>
                            Interest Quiz!
                        </DialogTitle>
                        <div className='interestscontainer'>
                            <Paper className='interestdiv'>
                                <input type='checkbox' value='interest 1' onChange={this.appendValue}></input>
                            </Paper>
                            <Paper className='interestdiv'>
                                <input type='checkbox' value='interest 2' onChange={this.appendValue}></input>
                            </Paper>
                            <Paper className='interestdiv'>
                                <input type='checkbox' value='interest 3' onChange={this.appendValue}></input>
                            </Paper>
                            <Paper className='interestdiv'>
                                <input type='checkbox' value='interest 4' onChange={this.appendValue}></input>
                            </Paper>
                            <Paper className='interestdiv'>
                                <input type='checkbox' value='interest 5' onChange={this.appendValue}></input>
                            </Paper>
                            <Paper className='interestdiv'>
                                <input type='checkbox' value='interest 6' onChange={this.appendValue}></input>
                            </Paper>
                            <Paper className='interestdiv'>
                                <input type='checkbox' value='interest 7' onChange={this.appendValue}></input>
                            </Paper>
                            <Paper className='interestdiv'>
                                <input type='checkbox' value='interest 8' onChange={this.appendValue}></input>
                            </Paper>
                        </div>
                        <DialogActions>
                            <Link to='/profile/:username' className='donebutton' onClick={this.sendInterests}>
                                Done!
                            </Link>
                        </DialogActions>
                    </div>
                </Dialog>
        )
    }
}

export default InterestQuiz;
