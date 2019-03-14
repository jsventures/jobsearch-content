## System Design: Going Deep
Now that we’ve gone broad, it’s time to go **deep**.

At this point in the interview we’ve noted down a bunch of tradeoffs and problems remaining to solve. It’s time do demonstrate our expertise by going deep.

Here’s how we suggest you do this:

Start by looking at the most critical problems — perhaps it’s scaling a particular piece, or designing a particular API.

Imagine now that you are giving this piece to a relatively strong, but inexperienced engineer. Now, spend the time to really unravel, and build up the spec for this piece.

For example, say we are building out the twitter feed api — we need to answer what the parameters look like, how will paginating work? We now will handle how the client will merge the data.

If any tradeoff comes to mind, make sure to mention it. For example, we could have feed connected through websockets, or through http — what would the tradeoffs be for both?

Go problem by problem, until you are satisfied that you’ve dealt with the most important tradeoffs. If you have time, keep going.

Choose the sections that you are strongest in and start to expand out — For example, if you have experience in machine learning, you can go deeper on the fraud detection for tweets — how would the models be deployed, what would the feedback loop look like, how would that piece scale, what would the API look like?

By going deep, you will have communicated your ability to break down problems, find the tradeoffs, and build a complex system that solves the problem. You would have also communicated real experience and expertise through your deep dives.

### Go the extra mile
Your system is complete, but you can go further — what are the steps we would take to ***launch?***

For example — how can you make this testable? How can you make this maintainable? What would the deployment process look like? Do you see any problems for extending the project? What kind of alerts would you set up? What would you have in your oncall document?

This is your opportunity to demonstrate you have **strong competence** in launching projects like this **from start to finish.**

If you are able to get the extra mile, and you take a picture of that whiteboard, you actually will be able to use this to kick off this project.

Congratulations, you’ve now gone through all the phases of the system design interview!

