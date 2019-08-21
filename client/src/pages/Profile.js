import React, { Component } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SnackBar from '../components/SnackBar/SnackBar';
import Avatar from '@material-ui/core/Avatar';
import { Card, Typography } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import house from '../assets/house.png';
import { Route, Link, withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import InterestQuizDialog from '../components/Dialog/InterestQuizDialog/QuizDialog';
import PostDialog from '../components/Dialog/PostDialog/PostDialog';
import BoardDialog from '../components/Dialog/BoardDialog/BoardDialog';
import EditPicUserDialog from '../components/Dialog/EditPicUserDialog/EditPicUserDialog';
import Button from '@material-ui/core/Button';
import {
    getBoardsandPosts,
    followUser,
    unfollowUser,
    fetchProfileInfo
} from '../actions/profileActions';
import Posts from '../components/Posts/Posts';
import _ from 'lodash';
import './stylesheet/Profile.css';
import Masonry from 'react-masonry-component';

class Profile extends Component {
    state = {
        username: '',
        activePanel: 'board',
        SnackBar: !_.isEmpty(this.props.profileStore.error)
    };

    componentDidMount () {
        const username = this.props.match.params.username;
        this.setState({ username: username });
        this.props.fetchProfileInfo(username);
    }

    togglePosts = () => {
        this.setState({ activePanel: 'post' });
    };

    toggleBoards = () => {
        this.setState({ activePanel: 'board' });
    };

    toggleFavorites = () => {
        this.setState({ activePanel: 'favorite' });
    };

    onCreateBoardPress = () => {
        this.props.history.push(`/profile/${this.state.username}/board/create`);
    };

    onCreatePostPress = () => {
        this.props.history.push(`/profile/${this.state.username}/post/create`);
    };

    onFollowPress = () => {
        const {
            userStore: { authenticated, user },
            profileStore: { profileInfo },
            history,
            followUser
        } = this.props;
        const followee = profileInfo._id;
        const currentUserId = user._id;
        if (!authenticated) {
            history.push('/login');
        } else {
            followUser(followee, currentUserId);
            this.setState({ followedOrNot: !this.state.followedOrNot });
        }
    };

    onUnfollowPress = () => {
        const {
            userStore: { user },
            profileStore: { profileInfo },
            unfollowUser
        } = this.props;
        const currentUserId = user._id;
        const followee = profileInfo._id;
        unfollowUser(followee, currentUserId);
        this.setState({ followedOrNot: !this.state.followedOrNot });
    };

    checkFollowing = () => {
        const {
            userStore: { user },
            profileStore: { profileInfo: { followers } }
        } = this.props;
        const res = _.filter(followers, follower => follower._id === user._id);
        return _.isEmpty(res);
    };

    renderFollowButton = () => {
        return this.checkFollowing() ? (
            <Button className='followButton' color='primary' onClick={() => this.onFollowPress()}>
                Follow!
            </Button>
        ) : (
            <Button className='followButton' color='primary' variant={'contained'} onClick={() => this.onUnfollowPress()}>
                Stop Following!
            </Button>
        );
    };

    renderBoards = () => {
        const { boards } = this.props.profileStore.profileInfo;
        return boards.length === 0 ? (
            <h2>There are no boards</h2>
        ) : (
            boards.map((board, i) => {
                return (
                    <Card key={i} className='card'>
                        <Link to='/board/posts_in_board' className='boardLink'>
                            <CardActionArea>
                                <CardMedia className='cardImg' image={house} />
                                <Typography variant='h6' className='cardHeader'>
                                    {board['title']}
                                </Typography>
                                <Typography variant='body1' className='cardHeader'>
                                    {board['posts'].length} posts
                                </Typography>
                            </CardActionArea>
                        </Link>
                    </Card>
                );
            })
        );
    };

    renderPosts = () => {
        const { posts } = this.props.profileStore.profileInfo;
        return posts.length === 0 ? <h2>There are no posts</h2> : <Posts posts={posts} />;
    };

    renderFavorites = () => {
        const favoritePosts = [];
        const favorites = favoritePosts.map(function (el) {
            return (
                <img className='favoritePost' src={el} key={el}></img>
            );
        });
        return favoritePosts.length === 0 ? (
            <h2>You have no favorite posts</h2>
        ) : (
            <Masonry
                className='masonry'
                elementType={'div'}
                options={{ fitWidth: true, gutter: 15 }}
            >
                {favorites}
            </Masonry>
        );
    }

    renderCreateButtons = () => {
        const {
            userStore: { user, authenticated },
            profileStore: { profileInfo }
        } = this.props;
        if (authenticated) {
            if (profileInfo._id !== user._id) {
                return <>{this.renderFollowButton()}</>;
            }
        } else if (!authenticated) {
            return <>{this.renderFollowButton()}</>;
        }
        return (
            <>
                <Button
                    color='primary'
                    onClick={() => this.onCreateBoardPress()}
                    style={{
                        margin: '10px'
                    }}
                >
                    Create Board
                </Button>
                <Button
                    color='primary'
                    variant={'contained'}
                    onClick={() => this.onCreatePostPress()}
                    style={{
                        margin: '10px'
                    }}
                >
                    Create Post
                </Button>
            </>
        );
    };

    renderSnackBarError = () => {
        const { profileStore } = this.props;
        if (!_.isEmpty(profileStore.error)) {
            return (
                <SnackBar
                    message= { profileStore.error }
                    variant='error'
                    open={this.state.SnackBar}
                    onClose = {() => this.setState({ SnackBar: false })}
                />
            );
        }
    };

    render () {
        const {
            profileStore: { profileInfo, loading }
        } = this.props;
        if (_.isUndefined(profileInfo) || loading) {
            return <div><CircularProgress className='spinner' /></div>;
        }
        return (
            <div>
                <Route path='/profile/:username/edit' component={EditPicUserDialog} />
                <Route path='/profile/:username/interest-quiz' component={InterestQuizDialog} />
                <Route path='/profile/:username/post/create' component={PostDialog} />
                <Route path='/profile/:username/board/create' component={BoardDialog} />
                <div className='subHeader'>
                    <div className='nameContainer'>
                        <Avatar
                            className='subHeaderIcon'
                            component={Link}
                            src={profileInfo.profile}
                            to={'/profile/' + profileInfo.username + '/edit'}
                        />
                        <div>
                            <h3 className='profileName'>{profileInfo.name}</h3>
                            <h5 className='profileFollowers'>
                                {profileInfo.followers.length} Followers |{' '}
                                {profileInfo.following.length} Following
                            </h5>
                        </div>
                    </div>
                    <div />
                    <div>{this.renderCreateButtons()}</div>
                </div>
                <div style={{ display: this.state.activePanel === 'board' ? 'grid' : 'none' }}>
                    <div className='tabSection'>
                        <div>
                            <Button
                                color='primary'
                                variant={'contained'}
                                style={{
                                    margin: '10px'
                                }}
                            >
                                Boards
                            </Button>
                            <Button
                                color='primary'
                                onClick={() => this.togglePosts()}
                                style={{
                                    margin: '10px'
                                }}
                            >
                                Posts
                            </Button>
                            <Button
                                color='primary'
                                onClick={() => this.toggleFavorites()}
                                style={{
                                    margin: '10px'
                                }}
                            >
                                Favorites
                            </Button>
                        </div>
                        <div />
                    </div>
                    <div className='activePanel'>
                        <div
                            className={
                                profileInfo.boards.length === 0 ? 'gridContainer1' : 'gridContainer'
                            }
                        >
                            {this.renderBoards()}
                        </div>
                    </div>
                </div>
                <div style={{ display: this.state.activePanel === 'post' ? 'grid' : 'none' }}>
                    <div className='tabSection'>
                        <div>
                            <Button
                                color='primary'
                                onClick={() => this.toggleBoards()}
                                style={{
                                    margin: '10px'
                                }}
                            >
                                Boards
                            </Button>
                            <Button
                                color='primary'
                                variant={'contained'}
                                style={{
                                    margin: '10px'
                                }}
                            >
                                Posts
                            </Button>
                            <Button
                                color='primary'
                                onClick={() => this.toggleFavorites()}
                                style={{
                                    margin: '10px'
                                }}
                            >
                                Favorites
                            </Button>
                        </div>
                        <div />
                    </div>
                    <div className='activePanel'>
                        <div
                            className={
                                profileInfo.posts.length === 0 ? 'postContainer1' : 'postContainer'
                            }
                        >
                            <div style={{
                                width: '90vw'
                            }}>
                                {this.renderPosts()}
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ display: this.state.activePanel === 'favorite' ? 'grid' : 'none' }}>
                    <div className='tabSection'>
                        <div>
                            <Button
                                color='primary'
                                onClick={() => this.toggleBoards()}
                                style={{
                                    margin: '10px'
                                }}
                            >
                                Boards
                            </Button>
                            <Button
                                color='primary'
                                onClick={() => this.togglePosts()}
                                style={{
                                    margin: '10px'
                                }}
                            >
                                Posts
                            </Button>
                            <Button
                                color='primary'
                                variant={'contained'}
                                style={{
                                    margin: '10px'
                                }}
                            >
                                Favorites
                            </Button>
                        </div>
                        <div />
                    </div>
                    <div className='activePanel'>
                        {this.renderFavorites()}
                    </div>
                </div>
                {this.renderSnackBarError()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userStore: state.UserStore,
    profileStore: state.ProfileStore
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getBoardsandPosts,
            followUser,
            unfollowUser,
            fetchProfileInfo
        },
        dispatch
    );
};

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Profile);
