import Review from "../models/review.js";

export function addReview(req, res) {
  if (req.user == null) {
    res.status(401).json({
      message: "Please login and try again",
    });
    return;
  }

  const data = req.body;

  data.name = req.user.firstName + " " + req.user.lastName;
  data.profilePicture = req.user.profilePicture;
  data.email = req.user.email;

  const newReview = new Review(data);

  newReview
    .save()
    .then(() => {
      res.json({ message: "Review added successfully" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Review addition failed" });
    });
}

export async function getReviews(req, res) {
  const user = req.user; // Get the user from the request
  
  try{
    const reviews = await Review.find();
    res.json(reviews);

    
  }
    
  catch (e) {
    res.status(500).json({error: "Review loading failed"});
  }

}

// This function is intended to delete a review based on the email provided in the request parameters.
export function deleteReview(req, res) {
  const email = req.params.email; // Get the email from the request parameters

  // Check if the user is logged in
  if (req.user == null) {
    res.status(401).json({
      message: "Please login and try again",
    });

    return;
  }

  if (req.user.role == "admin") {
    Review.deleteOne({ email: email })
      .then(() => {
        res.json({ message: "Review deleted successfully" });
      })
      .catch(() => {
        res.status(500).json({ error: "Review deletion failed" });
      });

    return;
  }

  if (req.user.role == "customer") {
    if (req.user.email == email) {
      Review.deleteOne({ email: email })
        .then(() => {
          res.json({ message: "Review deleted successfully" });
        })
        .catch(() => {
          res.json({ error: "Review deletion failed" });
        });
    } else {
      res.status(403).json({
        message: "You are not authorized to delete this review",
      });
    }
  }
}


// This function is intended to approve a review based on the email provided in the request parameters.
export function approveReview(req, res) {
  const email = req.params.email;

  if (req.user == null) {
    res.status(401).json({
      message: "Please login and try again",
    });
    return;
  }

  if (req.user.role == "admin") {
    Review.updateOne(
      {
        email: email,
      },
      {
        isApproved: true,
      }
    )
      .then(() => {
        res.json({ message: "Review approved successfully" });
      })
      .catch(() => {
        res.status(500).json({ error: "Review approval failed" });
      });
  }
  else{
    res.status(403).json({message : "You are not an admin. Only admins can approve reviews."})
  }

}
