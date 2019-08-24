import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFollowing } from '../../actions/userActions';
import Avatar from '@material-ui/core/Avatar';

class FollowingPage extends Component {
    state = {
        placeholder: ''
    };

    componentDidMount () {
        this.props.getFollowing(this.props.userStore.user._id);
    }

    Users = () => {
        const { following } = this.props.userStore;
        if (!following) {
            return null;
        }

        return following.length === 0 ? (
            <h2>There are no users</h2>
        ) : (
            following.map((user, i) => {
                return (
                    <div key={i}>
                        <Avatar src={user.profile}/>
                        <p>{user.name}</p>
                    </div>
                );
            })
        );
    };

    render () {
        return (
            <div>
                <h1>This is the followers page</h1>
                <div>
                    {this.Users()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userStore: state.UserStore
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getFollowing
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FollowingPage);
