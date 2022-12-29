export const Auth0TokenProvider = () => {
    const getAuth0UserDetails = () => {
        let data = "";
        try {
            data = JSON.parse(localStorage.getItem("@@auth0spajs@@::" + "eACG1Ww9RQSOzODzyWu37HR0GalgYGsN" +"::default::openid profile email"))
        } catch (e) { 
            console.error(e)
        }
        let userDetails = data?.body?.decodedToken?.user?.email ? data.body.decodedToken.user.email : "";
        return userDetails
    }
    return {
        getUserDetails: getAuth0UserDetails
    }
}