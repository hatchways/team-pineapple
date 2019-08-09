import React, { useState, useEffect } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { Route } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import InterestQuizDialog from '../components/Dialog/InterestQuizDialog/QuizDialog';
import PostDialog from '../components/Dialog/PostDialog/PostDialog';
import BoardDialog from '../components/Dialog/BoardDialog/BoardDialog';

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

// eslint-disable-next-line react/prop-types
const Profile = ({ classes, userStore, location }) => {
    const username = location.pathname.split('/')[2];

    let [activePanel, toggle] = useState('board');
    let [boards, posts] = useState([

    ]);

    useEffect(() => {
        console.log(userStore.user);
        // boards = userStore.user.board;
    });

    return (
        <div>
            <Navbar />
            <Route path='/profile/:username/interest-quiz' component={InterestQuizDialog} />
            <Route path='/profile/:username/post/create' component={PostDialog} />
            <Route path='/profile/:username/board/create' component={BoardDialog} />
            {/*<div className={classes.subHeader}>*/}
            {/*    <div className={classes.nameContainer}>*/}
            {/*        <img src={face} alt='' className={classes.subHeaderIcon} />*/}
            {/*        <div>*/}
            {/*            <h3 className={classes.profileName}>{username}</h3>*/}
            {/*            <h5 className={classes.profileFollowers}>134 Followers | 280 Following</h5>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div />*/}
            {/*    <div>*/}
            {/*        <Link to={`/profile/${username}/board/create`}>*/}
            {/*            <button className={classes.createBoard}>Create Board</button>*/}
            {/*        </Link>*/}
            {/*        <Link to={`/profile/${username}/post/create`}>*/}
            {/*            <button className={classes.createPost}>Create Post</button>*/}
            {/*        </Link>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div style={{ display: activePanel === 'board' ? 'grid' : 'none' }}>*/}
            {/*    <div className={classes.tabSection}>*/}
            {/*        <div>*/}
            {/*            <button*/}
            {/*                className={classes.activeTab}*/}
            {/*                onClick={() => toggle((activePanel = 'board'))}*/}
            {/*            >*/}
            {/*                    Boards*/}
            {/*            </button>*/}
            {/*            <button*/}
            {/*                className={classes.tab}*/}
            {/*                onClick={() => toggle((activePanel = 'post'))}*/}
            {/*            >*/}
            {/*                    My Posts*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*        <div />*/}
            {/*    </div>*/}
            {/*    <div className={classes.activePanel}>*/}
            {/*        <div className={boards.length === 0 ? classes.gridContainer1 : classes.gridContainer}>*/}
            {/*            {*/}
            {/*                boards.length === 0*/}
            {/*                    ? <h2>You have not added any boards yet.</h2>*/}
            {/*                    : boards.map((board, i) => {*/}
            {/*                        return <Card key={board['title']} className={classes.card}>*/}
            {/*                            <CardActionArea className={classes.card}>*/}
            {/*                                <CardMedia className={classes.cardImg} image={house} />*/}
            {/*                                <Typography variant='h6' className={classes.cardHeader}>*/}
            {/*                                    {board['title']}*/}
            {/*                                </Typography>*/}
            {/*                                <Typography variant='p' className={classes.cardHeader}>*/}
            {/*                                    {board['posts'].length} posts*/}
            {/*                                </Typography>*/}
            {/*                            </CardActionArea>*/}
            {/*                        </Card>;*/}
            {/*                    })*/}
            {/*            }*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div style={{ display: activePanel === 'post' ? 'grid' : 'none' }}>*/}
            {/*    <div className={classes.tabSection}>*/}
            {/*        <div>*/}
            {/*            <button*/}
            {/*                className={classes.tab}*/}
            {/*                onClick={() => toggle((activePanel = 'board'))}*/}
            {/*            >*/}
            {/*                    Boards*/}
            {/*            </button>*/}
            {/*            <button*/}
            {/*                className={classes.activeTab}*/}
            {/*                onClick={() => toggle((activePanel = 'post'))}*/}
            {/*            >*/}
            {/*                    My Posts*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*        <div />*/}
            {/*    </div>*/}
            {/*    <div className={classes.activePanel}>*/}
            {/*        <div className={posts.length === 0 ? classes.postContainer1 : classes.postContainer}>*/}
            {/*            {*/}
            {/*                posts.length === 0*/}
            {/*                    ? <h2>You have not added any posts yet.</h2>*/}
            {/*                    : posts.map((post, i) => {*/}
            {/*                        return <Card key={post['title']} className={classes.post}>*/}
            {/*                            <CardActionArea className={classes.post}>*/}
            {/*                                <CardMedia className={classes.postImg} image={post['image']}>*/}
            {/*                                    <p className={classes.postLink}>*/}
            {/*                                        {post['link']}*/}
            {/*                                    </p>*/}
            {/*                                </CardMedia>*/}
            {/*                            </CardActionArea>*/}
            {/*                        </Card>;*/}
            {/*                    })*/}
            {/*            }*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

const mapStateToProps = state => ({
    userStore: state.UserStore
});

function mapDispatchToProps (dispatch) {
    return bindActionCreators(
        {
            // TODO: redux integration
        },
        dispatch
    );
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Profile);
