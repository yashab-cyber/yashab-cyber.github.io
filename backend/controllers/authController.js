import jwt from "jsonwebtoken";

export const googleCallback = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = jwt.sign(
      { id: req.user._id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.redirect(`${process.env.CLIENT_URL}/dashboard?token=${token}`);
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProfile = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not logged in" });
  }

  res.status(200).json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
};

export const logout = (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: "Logged out successfully" });
  });
};
