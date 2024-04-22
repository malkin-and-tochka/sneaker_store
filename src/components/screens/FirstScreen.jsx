import React from 'react';
import {useSelector} from "react-redux";
import {getIsAuth} from "../../redux/reducers/authReducer";
import LoginForm from "./authorization/LoginForm";
import Navigation from "../navigation/Navigation";

const FirstScreen = () => {
    const isAuth = useSelector(getIsAuth)
    return (
        <>
            {isAuth ?
                <Navigation/>
                :
                <LoginForm/>
            }
        </>
    );
};

export default FirstScreen;
