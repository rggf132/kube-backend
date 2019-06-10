export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    //req.isAuthenticated() will return true if user is logged in
    next();
  } else {
    console.log("Not authenticated");
    res.status(203).send({ error: "Not Authenticated" });
  }
};
