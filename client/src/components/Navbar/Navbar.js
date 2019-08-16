import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { makeStyles } from '@material-ui/styles';
import { Link, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { logout } from '../../actions/userActions';
import NavMenu from './NavMenu';
import NavSearch from './NavSearch';
import { searchPosts } from '../../actions/post';

const useStyles = makeStyles(theme => ({
    header: {
        display: 'grid',
        gridTemplateColumns: '5fr 3fr 6fr 2.5fr 2.5fr 0fr 3fr',
        minHeight: '6rem',
        justifyItems: 'center',
        alignItems: 'center'
    },
    headerBottomBorder: {
        minHeight: '5px',
        backgroundImage: 'linear-gradient(lightgrey, white)'
    },
    headerContainer: {
        position: 'fixed',
        background: 'white',
        zIndex: '10'
    },
    placeholderHeader: {
        minHeight: '14vh',
        height: '14vh'
    }
}));

const Navbar = ({ userStore, logout, history, location, searchPosts }) => {
    const [search, setSearch] = React.useState('');
    const style = useStyles();

    function handleLogOutClicked () {
        logout();
        history.push('/');
        window.location.reload();
    }

    function handleSearch (event) {
        event.preventDefault();
        // eslint-disable-next-line camelcase
        const { easy_filters = '' } = queryString.parse(location.search);
        if (userStore.authenticated) {
            searchPosts(search, easy_filters, userStore.user._id);
        } else {
            searchPosts(search, easy_filters, '');
        }
        history.push('/');
    }

    function handleSearchChange (event) {
        setSearch(event.target.value);
    }

    function clearSearch () {
        setSearch('');
    }

    return (
        <div>
            <div className={style.headerContainer}>
                <div className={style.header}>
                    <div>
                        <h3>Dream Home</h3>
                    </div>
                    <div />
                    <NavSearch search={search} handleSearch={handleSearch} handleChange={handleSearchChange}
                        clear={clearSearch}/>
                    <div>
                        <h5>
                            <Link to='/'>Home</Link>
                        </h5>
                    </div>
                    <div>
                        <h5>Following</h5>
                    </div>
                    <div />
                    <NavMenu user={userStore.user} handleLogOutClicked={handleLogOutClicked}
                        authenticated={userStore.authenticated}/>
                </div>
                <div className={style.headerBottomBorder} />
            </div>
            <div className={style.placeholderHeader}>placeholder</div>
        </div>
    );
};

const mapStateToProps = state => ({
    userStore: state.UserStore
});

function mapDispatchToProps (dispatch) {
    return bindActionCreators(
        {
            logout,
            searchPosts
        },
        dispatch
    );
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Navbar);
