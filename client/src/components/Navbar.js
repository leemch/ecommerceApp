import React from "react";
import {Box, Text, Heading, Image, Button} from "gestalt";
import {NavLink, withRouter} from "react-router-dom";
import {getToken, clearToken, clearCart} from "../utils";

class NavBar extends React.Component {

    handleSignout = () => {
        clearToken();
        clearCart();
        this.props.history.push("/");
    }

    render(){
        return getToken() !== null ? <AuthNav handleSignout={this.handleSignout} /> : <UnAuthNav />;
    }
    
}


const AuthNav = ({handleSignout}) => (
    <Box
    display="flex"
    alignItems="center"
    justifyContent="around"
    height={70}
    color="midnight"
    padding={1}
    shape="roundedBottom"
    >
    {/*Check out Link */}
    <NavLink activeClassName="active" to="/checkout">
        <Text size="xl" color="white">Check Out</Text>
    </NavLink>

    {/* Title and logo */}
    <NavLink activeClassName="active" exact to="/">
    <Box display="flex" alignItems='center'>
    <Box margin={2} height={50} width={50}>
        <Image 
            alt="TWF logo"
            naturalHeight={1}
            naturalWidth={1}
            src="./icons/logo.svg"
        />
    </Box>
        <Heading size="xs" color="orange">
            True World Foods
        </Heading>
    </Box>
    </NavLink>

    {/*Sign out Button */}
    <Button
        color="transparent"
        text="Sign Out"
        inline size="md"
        onClick={handleSignout}
    ></Button>

    

    </Box>
);

const UnAuthNav = () => (
    <Box
    display="flex"
    alignItems="center"
    justifyContent="around"
    height={70}
    color="midnight"
    padding={1}
    shape="roundedBottom"
    >
    {/*Sign in Link */}
    <NavLink activeClassName="active" to="/signin">
        <Text size="xl" color="white">Sign In</Text>
    </NavLink>

    {/* Title and logo */}
    <NavLink activeClassName="active" exact to="/">
    <Box display="flex" alignItems='center'>
    <Box margin={2} height={50} width={50}>
        <Image 
            alt="TWF logo"
            naturalHeight={1}
            naturalWidth={1}
            src="./icons/logo.svg"
        />
    </Box>
        <Heading size="xs" color="orange">
            True World Foods
        </Heading>
    </Box>
    </NavLink>

    {/*Sign up Link */}
    <NavLink activeClassName="active" to="/signup">
        <Text size="xl" color="white">Sign Up</Text>
    </NavLink>

    

    </Box>
    
);

export default withRouter(NavBar);