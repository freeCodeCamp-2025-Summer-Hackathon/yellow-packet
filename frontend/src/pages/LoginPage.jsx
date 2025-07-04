function LoginPage(user, setUser) {
    if (user){
        setUser(null); // log out if logged in 
    }
    
    //login page logic

  return (
    <>
      <div>
        {/* We don't really need extra components for this one.
            This page is for login AND signup and will need extensive testing because it sets the tone for everything else on the app. 
            */}
      </div>
    </>
  )
}

export default LoginPage