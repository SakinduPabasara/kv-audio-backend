import Review from "../models/review.js";

// export function addReview(req,res){
//     if(req.user == null){        // Check if the user is not logged in
//         res.status(401).json({
//             message : "Please login and try again"
//         })
//         return;    // Return here to exit the function if user is not logged in
//     }

//     const data = req.body;  // Assuming data contains the review details

//     data.name = req.user.firstName + " " + req.user.lastName;  // Set the name field in the review data to the user's full name
//     data.profilePicture = req.user.profilePicture;
//     data.email = req.user.email;

//     const newReview = new Review(data)  //මේකෙන් Review model එකේ structure එකට අනුව data එකක් හදනවා

//     // Save the new review to the database
//     newReview.save().then(() => {
//         res.json({ message: "Review added successfully" });
//     }).catch((error) => {
//         res.status(500).json({ error: "Review addition failed" });
//     });

// }

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

export function getReviews(req, res) {
  const user = req.user; // Get the user from the request

  if (user == null || user.role != "admin") {
    // Check if the user is not logged in or is not an admin
    Review.find({ isApproved: true }).then((reviews) => {
      res.json(reviews);
    });
    return; // Return here to exit the function if the user is not an admin
  }
  if (user.role == "admin") {
    Review.find().then((reviews) => {
      res.json(reviews);
    });
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
