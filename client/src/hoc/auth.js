import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {auth} from '../actions/user.actions';

export default (SpecificComponent, option, adminRoute = null) => {
    function AuthenticationCheck(props) {
        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            // to know current status send auth request
            dispatch(auth()).then(response => {
                if(!response.payload.isAuth) {
                    if(option) {
                        props.history.push('/login');
                    }
                } else {
                    if(adminRoute && !response.payload.isAdmin) {
                        props.history.push('/');
                    } else {
                        if (option === false) {
                            props.history.push('/');
                        }
                    }
                }
            })
        }, []);
        return(
            <SpecificComponent {...props} user={user} />
        ); 
    }
    return AuthenticationCheck;
}
