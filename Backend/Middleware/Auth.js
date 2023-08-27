const jwt = require("jsonwebtoken");
const User = require("../Model/user");

exports.checkUserRoles = (requiredRoles) => async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    console.log("Before redirect");
    return res.redirect("/login");
  }

  // Verify the JWT token
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const userRole = decoded.role;
    console.log(decoded);
    const userId = decoded.id;

    try {
      // Find the user by ID
      const user = await User.findById(userId);
      console.log(user);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = user;

      // Check if the user's role matches any of the required roles
      const hasRequiredRole = requiredRoles.includes(userRole);
      if (hasRequiredRole) {
        next();
      } else {
        // User does not have any of the required roles, return an error response
        res.status(403).json({ message: "Access denied" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error retrieving user" });
    }
  });
};
