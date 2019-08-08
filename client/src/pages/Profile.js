import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import face from './face.jpg';
import { Card, Typography } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import house from './house.png';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
const useStyles = makeStyles(theme => ({
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
    postImg: {
        width: '16vw',
        minHeight: '50vh',
    },
    postLink: {
        fontSize: '16px',
        textAlign: 'center',
        padding: '0',
        margin: '0',
    },
}));

const Profile = ({ location }) => {
    const style = useStyles();
    const username = location.pathname.split('/')[2];
    
    let [activePanel, toggle] = useState('board');
    let [boards, setBoards] = useState([
        {
            "_id": "5d4c50381de1e451e8c1760f",
            "posts": [],
            "date": "2019-08-08T14:20:51.333Z",
            "title": "test board1",
            "user": "5d4c3fcb1de1e451e8c1760d",
            "__v": 0
        },
        {
            "_id": "5d4c50651de1e451e8c17610",
            "posts": [],
            "date": "2019-08-08T14:20:51.333Z",
            "title": "test board2",
            "user": "5d4c3fcb1de1e451e8c1760d",
            "__v": 0
        }
    ])
    let [posts, setPosts] = useState([
        {
            "_id": "5d4c55cacf7d2046c003baf0",
            "tags": [
                "['']"
            ],
            "title": "test post",
            "description": "tesing posts",
            "link": "test",
            "user": "5d4c3fcb1de1e451e8c1760d",
            "image": "https://team-pineapple.s3.ca-central-1.amazonaws.com/1565283786119.jpg",
            "date": "2019-08-08T17:03:06.912Z",
            "__v": 0
        },
        {
            "_id": "5d4c5659cf7d2046c003baf1",
            "tags": [
                "['']"
            ],
            "title": "test post1",
            "description": "tesing posts",
            "link": "test",
            "user": "5d4c3fcb1de1e451e8c1760d",
            "image": "https://team-pineapple.s3.ca-central-1.amazonaws.com/1565283929383.jpg",
            "date": "2019-08-08T17:05:29.657Z",
            "__v": 0
        },
        {
            "_id": "5d4c55cacf7d2046c003baf0",
            "tags": [
                "['']"
            ],
            "title": "test post",
            "description": "tesing posts",
            "link": "test",
            "user": "5d4c3fcb1de1e451e8c1760d",
            "image": "https://team-pineapple.s3.ca-central-1.amazonaws.com/1565283786119.jpg",
            "date": "2019-08-08T17:03:06.912Z",
            "__v": 0
        },
        {
            "_id": "5d4c55cacf7d2046c003baf0",
            "tags": [
                "['']"
            ],
            "title": "test post",
            "description": "tesing posts",
            "link": "test",
            "user": "5d4c3fcb1de1e451e8c1760d",
            "image": "https://team-pineapple.s3.ca-central-1.amazonaws.com/1565283786119.jpg",
            "date": "2019-08-08T17:03:06.912Z",
            "__v": 0
        },
        {
            "_id": "5d4c55cacf7d2046c003baf0",
            "tags": [
                "['']"
            ],
            "title": "test post",
            "description": "tesing posts",
            "link": "test",
            "user": "5d4c3fcb1de1e451e8c1760d",
            "image": "https://team-pineapple.s3.ca-central-1.amazonaws.com/1565283786119.jpg",
            "date": "2019-08-08T17:03:06.912Z",
            "__v": 0
        },
        {
            "_id": "5d4c55cacf7d2046c003baf0",
            "tags": [
                "['']"
            ],
            "title": "test post",
            "description": "tesing posts",
            "link": "test",
            "user": "5d4c3fcb1de1e451e8c1760d",
            "image": "https://team-pineapple.s3.ca-central-1.amazonaws.com/1565283786119.jpg",
            "date": "2019-08-08T17:03:06.912Z",
            "__v": 0
        },
        {
            "_id": "5d4c55cacf7d2046c003baf0",
            "tags": [
                "['']"
            ],
            "title": "test post",
            "description": "tesing posts",
            "link": "test",
            "user": "5d4c3fcb1de1e451e8c1760d",
            "image": "https://team-pineapple.s3.ca-central-1.amazonaws.com/1565283786119.jpg",
            "date": "2019-08-08T17:03:06.912Z",
            "__v": 0
        },
    ])
    
    // useEffect(() => {
    //     // fetch(`users/${username}`)
    //     // .then(response => response.json())
    //     // .then(data => setBoards((boards = data['user']['boards'])))
    //     // .then(data => setPosts((posts = data['user']['posts'])))
    // })
    
    if (boards.length === 0 && posts.length === 0) {
        return (
            <div>
                <Navbar />
                <div className={style.subHeader}>
                    <div className={style.nameContainer}>
                        <img src={face} alt='' className={style.subHeaderIcon} />
                        <div>
                            <h3 className={style.profileName}>{username}</h3>
                            <h5 className={style.profileFollowers}>134 Followers | 280 Following</h5>
                        </div>
                    </div>
                    <div />
                    <div>
                        <Link to={`/profile/${username}/board/create`}>
                            <button className={style.createBoard}>Create Board</button>
                        </Link>
                        <Link to={`/profile/${username}/post/create`}>
                            <button className={style.createPost}>Create Post</button>
                        </Link>
                    </div>
                </div>
                <div style={{ display: activePanel === 'board' ? 'grid' : 'none' }}>
                    <div className={style.tabSection}>
                        <div>
                            <button
                                className={style.activeTab}
                                onClick={() => toggle((activePanel = 'board'))}
                            >
                                Boards
                            </button>
                            <button
                                className={style.tab}
                                onClick={() => toggle((activePanel = 'post'))}
                            >
                                My Posts
                            </button>
                        </div>
                        <div />
                    </div>
                    <div className={style.activePanel}>
                        <div className={style.gridContainer}>
                            <h1>No boards found. Try adding some!</h1>
                        </div>
                    </div>
                </div>
                <div style={{ display: activePanel === 'post' ? 'grid' : 'none' }}>
                    <div className={style.tabSection}>
                        <div>
                            <button
                                className={style.tab}
                                onClick={() => toggle((activePanel = 'board'))}
                            >
                                Boards
                            </button>
                            <button
                                className={style.activeTab}
                                onClick={() => toggle((activePanel = 'post'))}
                            >
                                My Posts
                            </button>
                        </div>
                        <div />
                    </div>
                    <div className={style.activePanel}>
                        <div className={style.gridContainer}>
                            <h1>No Posts found. Try adding some!</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (boards.length > 0 && posts.length === 0) {
        return (
            <div>
                <Navbar />
                <div className={style.subHeader}>
                    <div className={style.nameContainer}>
                        <img src={face} alt='' className={style.subHeaderIcon} />
                        <div>
                            <h3 className={style.profileName}>{username}</h3>
                            <h5 className={style.profileFollowers}>134 Followers | 280 Following</h5>
                        </div>
                    </div>
                    <div />
                    <div>
                        <Link to={`/profile/${username}/board/create`}>
                            <button className={style.createBoard}>Create Board</button>
                        </Link>
                        <Link to={`/profile/${username}/post/create`}>
                            <button className={style.createPost}>Create Post</button>
                        </Link>
                    </div>
                </div>
                <div style={{ display: activePanel === 'board' ? 'grid' : 'none' }}>
                    <div className={style.tabSection}>
                        <div>
                            <button
                                className={style.activeTab}
                                onClick={() => toggle((activePanel = 'board'))}
                            >
                                Boards
                            </button>
                            <button
                                className={style.tab}
                                onClick={() => toggle((activePanel = 'post'))}
                            >
                                My Posts
                            </button>
                        </div>
                        <div />
                    </div>
                    <div className={style.activePanel}>
                        <div className={style.gridContainer}>
                                {
                                    boards.map((board, i) => {
                                            return <Card className={style.card}>
                                                        <CardActionArea className={style.card}>
                                                            <CardMedia className={style.cardImg} image={house} />
                                                            <Typography variant='h6' className={style.cardHeader}>
                                                                {board['title']}
                                                            </Typography>
                                                            <Typography variant='p' className={style.cardHeader}>
                                                                {board['posts'].length} posts
                                                            </Typography>
                                                        </CardActionArea>
                                                    </Card>
                                    })
                                }
                        </div>
                    </div>
                </div>
                <div style={{ display: activePanel === 'post' ? 'grid' : 'none' }}>
                    <div className={style.tabSection}>
                        <div>
                            <button
                                className={style.tab}
                                onClick={() => toggle((activePanel = 'board'))}
                            >
                                Boards
                            </button>
                            <button
                                className={style.activeTab}
                                onClick={() => toggle((activePanel = 'post'))}
                            >
                                My Posts
                            </button>
                        </div>
                        <div />
                    </div>
                    <div className={style.activePanel}>
                        <div className={style.gridContainer}>
                            <h1>No Posts found. Try adding some!</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (boards.length === 0 && posts.length > 0) {
        return (
            <div>
                <Navbar />
                <div className={style.subHeader}>
                    <div className={style.nameContainer}>
                        <img src={face} alt='' className={style.subHeaderIcon} />
                        <div>
                            <h3 className={style.profileName}>{username}</h3>
                            <h5 className={style.profileFollowers}>134 Followers | 280 Following</h5>
                        </div>
                    </div>
                    <div />
                    <div>
                        <Link to={`/profile/${username}/board/create`}>
                            <button className={style.createBoard}>Create Board</button>
                        </Link>
                        <Link to={`/profile/${username}/post/create`}>
                            <button className={style.createPost}>Create Post</button>
                        </Link>
                    </div>
                </div>
                <div style={{ display: activePanel === 'board' ? 'grid' : 'none' }}>
                    <div className={style.tabSection}>
                        <div>
                            <button
                                className={style.activeTab}
                                onClick={() => toggle((activePanel = 'board'))}
                            >
                                Boards
                            </button>
                            <button
                                className={style.tab}
                                onClick={() => toggle((activePanel = 'post'))}
                            >
                                My Posts
                            </button>
                        </div>
                        <div />
                    </div>
                    <div className={style.activePanel}>
                        <div className={style.gridContainer}>
                            <h1>No boards found. Try adding some!</h1>
                        </div>
                    </div>
                </div>
                <div style={{ display: activePanel === 'post' ? 'grid' : 'none' }}>
                    <div className={style.tabSection}>
                        <div>
                            <button
                                className={style.tab}
                                onClick={() => toggle((activePanel = 'board'))}
                            >
                                Boards
                            </button>
                            <button
                                className={style.activeTab}
                                onClick={() => toggle((activePanel = 'post'))}
                            >
                                My Posts
                            </button>
                        </div>
                        <div />
                    </div>
                    <div className={style.activePanel}>
                        <div className={style.gridContainer}>
                                {
                                    posts.map((post, i) => {
                                            return <Card className={style.card}>
                                                        <CardActionArea className={style.card}>
                                                            <CardMedia className={style.cardImg} image={house} />
                                                            <Typography variant='h6' className={style.cardHeader}>
                                                                {post}
                                                            </Typography>
                                                            <Typography variant='p' className={style.cardHeader}>
                                                                80 posts
                                                            </Typography>
                                                        </CardActionArea>
                                                    </Card>
                                    })
                                }
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <Navbar />
                <div className={style.subHeader}>
                    <div className={style.nameContainer}>
                        <img src={face} alt='' className={style.subHeaderIcon} />
                        <div>
                            <h3 className={style.profileName}>{username}</h3>
                            <h5 className={style.profileFollowers}>134 Followers | 280 Following</h5>
                        </div>
                    </div>
                    <div />
                    <div>
                        <Link to={`/profile/${username}/board/create`}>
                            <button className={style.createBoard}>Create Board</button>
                        </Link>
                        <Link to={`/profile/${username}/post/create`}>
                            <button className={style.createPost}>Create Post</button>
                        </Link>
                    </div>
                </div>
                <div style={{ display: activePanel === 'board' ? 'grid' : 'none' }}>
                    <div className={style.tabSection}>
                        <div>
                            <button
                                className={style.activeTab}
                                onClick={() => toggle((activePanel = 'board'))}
                            >
                                Boards
                            </button>
                            <button
                                className={style.tab}
                                onClick={() => toggle((activePanel = 'post'))}
                            >
                                My Posts
                            </button>
                        </div>
                        <div />
                    </div>
                    <div className={style.activePanel}>
                        <div className={style.gridContainer}>
                                {
                                    boards.map((board, i) => {
                                            return <Card className={style.card}>
                                                        <CardActionArea className={style.card}>
                                                            <CardMedia className={style.cardImg} image={house} />
                                                            <Typography variant='h6' className={style.cardHeader}>
                                                                {board['title']}
                                                            </Typography>
                                                            <Typography variant='p' className={style.cardHeader}>
                                                                {board['posts'].length} posts
                                                            </Typography>
                                                        </CardActionArea>
                                                    </Card>
                                    })
                                }
                        </div>
                    </div>
                </div>
                <div style={{ display: activePanel === 'post' ? 'grid' : 'none' }}>
                    <div className={style.tabSection}>
                        <div>
                            <button
                                className={style.tab}
                                onClick={() => toggle((activePanel = 'board'))}
                            >
                                Boards
                            </button>
                            <button
                                className={style.activeTab}
                                onClick={() => toggle((activePanel = 'post'))}
                            >
                                My Posts
                            </button>
                        </div>
                        <div />
                    </div>
                    <div className={style.activePanel}>
                        <div className={style.postContainer}>
                                {
                                    posts.map((post, i) => {
                                            return <Card className={style.post}>
                                                        <CardActionArea className={style.post}>
                                                            <CardMedia className={style.postImg} image={post['image']}>
                                                                <p className={style.postLink}>
                                                                    {post['link']}
                                                                </p>
                                                            </CardMedia>
                                                        </CardActionArea>
                                                    </Card>
                                    })
                                }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Profile;
