import React from 'react';
import { withStyles } from '@material-ui/styles';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Navbar from '../../components/Navbar/Navbar';
import Post from './Post';
import MorePosts from './MorePosts';
import Divider from '@material-ui/core/Divider';
import banna from '../../assets/banana.jpg';
import interior from '../../assets/interiour.jpg';
import live from '../../assets/live.jpg';
import livingroom from '../../assets/livingroom.jpg';
import plant1 from '../../assets/plant1.jpg';
import plant2 from '../../assets/plant2.jpg';
import plant3 from '../../assets/plant3.jpg';
import plant4 from '../../assets/plant4.jpg';
import post_pic from '../../assets/post_ex.png';

const styles = theme => ({
    post: {
        marginBottom: theme.spacing(4),
    },
    more: {
        marginTop: theme.spacing(4),
    }
});

class PostPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            board: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]: value});
    }

    save(e) {
        e.preventDefault();
        console.log(this.state.board);
    }

    render() {
        const { classes } = this.props;

        return(
            <div>
                <Navbar/>
                <div className={classes.post}>
                    <Post handleSave={this.save} handleSelectBoard={this.handleChange} value={this.state.board} post={{image: post_pic, author: 'Delores Jones', title: 'Small background garden', description: 'A small garden doesn\'t mean you can\'t create a chic outdoor space', date: 'Published 20 July 2019'}} boards={[{title:'1', _id: '1234'},{title:'2', _id:'567'},{title:'3', _id: '8910'}]}/>
                </div>
                <Divider component={'hr'}/>
                <div className={classes.more}>
                    <MorePosts posts={[{image:banna, title: 'Dreamy minimal interior'}, {image:interior, title: 'Banana Tree'}, {image:live, title: 'Ideas to fill your living room'}, {image:livingroom, title: 'amazing live plant decorations'}, {image:plant1, title: 'test'}, {image:plant2, title: 'test'}, {image:plant3, title: 'test'}, {image:plant4, title: 'test'}]} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userStore: state.UserStore,
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {

        },
        dispatch
    );
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(PostPage);