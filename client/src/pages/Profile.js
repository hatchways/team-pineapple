import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import face from '../assets/face.jpg';
import { Card, Typography } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import house from '../assets/house.png';
import { Link, Route } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import InterestQuizDialog from '../components/Dialog/InterestQuizDialog/QuizDialog';
import PostDialog from '../components/Dialog/PostDialog/PostDialog';
import BoardDialog from '../components/Dialog/BoardDialog/BoardDialog';
import { getBoardsandPosts } from '../actions/userActions';

const styles = theme => ({
    subHeader: {
        minHeight: '30vh',
        display: 'grid',
        gridTemplateColumns: '5fr 2fr 5fr',
        alignItems: 'center',
        justifyItems: 'center',
        borderBottom: '1px solid lightgrey'
    },
    subHeaderIcon: {
        width: '100px',
        height: '100px',
        borderRadius: '50px'
    },
    nameContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        justifyItems: 'center',
        alignItems: 'center'
    },
    profileName: {
        margin: '0',
        padding: '0'
    },
    profileFollowers: {
        margin: '0',
        padding: '0',
        paddingTop: '5px'
    },
    createBoard: {
        background: 'white',
        border: '1px solid lightgrey',
        borderRadius: '25px',
        padding: '10px 20px 10px 20px',
        fontWeight: 'bold',
        marginRight: '10px'
    },
    createPost: {
        background: 'black',
        color: 'white',
        border: 'none',
        borderRadius: '25px',
        padding: '10px 20px 10px 20px',
        fontWeight: 'bold'
    },
    tabSection: {
        minHeight: '25vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1.9fr',
        alignItems: 'center',
        justifyItems: 'center'
    },
    tab: {
        background: 'white',
        border: '1px solid lightgrey',
        borderRadius: '25px',
        padding: '10px 20px 10px 20px',
        fontWeight: 'bold',
        marginRight: '10px'
    },
    activeTab: {
        background: 'black',
        color: 'white',
        border: 'none',
        borderRadius: '25px',
        padding: '10px 20px 10px 20px',
        fontWeight: 'bold',
        marginRight: '10px'
    },
    activePanel: {
        display: 'grid',
        justifyItems: 'center',
        marginBottom: ' 50px'
    },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        justifyItems: 'center',
        gridGap: '20px'
    },
    gridContainer1: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        justifyItems: 'center',
        gridGap: '20px'
    },
    card: {
        paddingBottom: '1vh',
        height: '40vh',
        width: '26vw'
    },
    cardImg: {
        height: '32vh'
    },
    cardHeader: {
        marginLeft: '20px'
    },
    postContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
        justifyItems: 'center',
        gridGap: '10px'
    },
    postContainer1: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        justifyItems: 'center',
        gridGap: '10px'
    },
    postImg: {
        width: '16vw',
        minHeight: '50vh'
    },
    postLink: {
        fontSize: '16px',
        textAlign: 'center',
        padding: '0',
        margin: '0'
    }
});

class Profile extends Component {
    constructor (props) {
        super(props);

        this.state = {
            username: '',
            activePanel: 'board'
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount () {
        const username = this.props.match.params.username;
        this.setState({ username: username });
        this.props.getBoardsandPosts(username);
    }

    toggle () {
        if (this.state.activePanel === 'board') {
            this.setState({ activePanel: 'post' });
        } else {
            this.setState({ activePanel: 'board' });
        }
    }

    render () {
        const { classes } = this.props;

        if (!this.props.userStore.boards || !this.props.userStore.posts) {
            return (
                <div>
                    <Navbar/>
                    <CircularProgress/>
                </div>
            );
        }

        return (
            <div>
                <Navbar/>
                <Route path='/profile/:username/interest-quiz' component={InterestQuizDialog}/>
                <Route path='/profile/:username/post/create' component={PostDialog}/>
                <Route path='/profile/:username/board/create' component={BoardDialog}/>
                <div className={classes.subHeader}>
                    <div className={classes.nameContainer}>
                        <img src={face} alt='' className={classes.subHeaderIcon}/>
                        <div>
                            <h3 className={classes.profileName}>{this.state.username}</h3>
                            <h5 className={classes.profileFollowers}>134 Followers | 280 Following</h5>
                        </div>
                    </div>
                    <div/>
                    <div>
                        <Link to={`/profile/${this.state.username}/board/create`}>
                            <button className={classes.createBoard}>Create Board</button>
                        </Link>
                        <Link to={`/profile/${this.state.username}/post/create`}>
                            <button className={classes.createPost}>Create Post</button>
                        </Link>
                    </div>
                </div>
                <div style={{ display: this.state.activePanel === 'board' ? 'grid' : 'none' }}>
                    <div className={classes.tabSection}>
                        <div>
                            <button
                                className={classes.activeTab}
                                onClick={this.toggle}
                            >
                                Boards
                            </button>
                            <button
                                className={classes.tab}
                                onClick={this.toggle}
                            >
                                My Posts
                            </button>
                        </div>
                        <div/>
                    </div>
                    <div className={classes.activePanel}>
                        <div
                            className={this.props.userStore.boards.length === 0 ? classes.gridContainer1 : classes.gridContainer}>
                            {
                                this.props.userStore.boards.length === 0
                                    ? <h2>You have not added any boards yet.</h2>
                                    : this.props.userStore.boards.map((board, i) => {
                                        return <Card key={i} className={classes.card}>
                                            <CardActionArea className={classes.card}>
                                                <CardMedia className={classes.cardImg} image={house}/>
                                                <Typography variant='h6' className={classes.cardHeader}>
                                                    {board['title']}
                                                </Typography>
                                                <Typography variant='body1' className={classes.cardHeader}>
                                                    {board['posts'].length} posts
                                                </Typography>
                                            </CardActionArea>
                                        </Card>;
                                    })
                            }
                        </div>
                    </div>
                </div>
                <div style={{ display: this.state.activePanel === 'post' ? 'grid' : 'none' }}>
                    <div className={classes.tabSection}>
                        <div>
                            <button
                                className={classes.tab}
                                onClick={this.toggle}
                            >
                                Boards
                            </button>
                            <button
                                className={classes.activeTab}
                                onClick={this.toggle}
                            >
                                My Posts
                            </button>
                        </div>
                        <div/>
                    </div>
                    <div className={classes.activePanel}>
                        <div
                            className={this.props.userStore.posts.length === 0 ? classes.postContainer1 : classes.postContainer}>
                            {
                                this.props.userStore.posts.length === 0
                                    ? <h2>You have not added any posts yet.</h2>
                                    : this.props.userStore.posts.map((post, i) => {
                                        return <Card key={i} className={classes.post}>
                                            <CardActionArea className={classes.post}>
                                                <CardMedia className={classes.postImg} image={post['image']}>
                                                    <p className={classes.postLink}>
                                                        {post['link']}
                                                    </p>
                                                </CardMedia>
                                            </CardActionArea>
                                        </Card>;
                                    })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => ({
    userStore: state.UserStore
});

function mapDispatchToProps (dispatch) {
    return bindActionCreators(
        {
            getBoardsandPosts
        },
        dispatch
    );
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Profile);
