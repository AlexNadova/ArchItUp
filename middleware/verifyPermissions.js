// middleware for doing role-based permissions
/* export default function permit(...allowed) {
    const isAllowed = role => allowed.indexOf(role) > -1;
    
    // return a middleware
    return (request, response, next) => {
      if (request.user && isAllowed(request.user.role))
        next(); // role is allowed, so continue on the next middleware
      else {
        response.status(403).json({message: "Forbidden"});
      }
    }
  } */

  //if(user_permission_level & required_permission_level) {
   //   return next();
  //} else {
   //   return res.status(403).send("You do not have permission to access these data");
  //}