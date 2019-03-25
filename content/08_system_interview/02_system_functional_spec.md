## System Design Interview: The Functional Spec
The question you get asked will be ambiguous. Your goal for the first phase of the interview is to take that problem, and make it concrete.

To show great signal here, you’ll want to demonstrate leadership by taking initiative and leading the discussion. With very little prodding, you should be able to flesh out all the requirements for your system.

Here’s how you can do that.

Step up to the whiteboard, and write down these words

* Not Dos
* Functional Spec
* Technical Spec
* Related Problems

Then, imagine you need to deliver this **for real**, and start asking question:

First, explore the constraints — if we are building a Twitter feed — are we building for iphone and android too? Do we support offline mode? Do we support privacy settings?

Then, explore the functional specifications — can we have retweets, do retweets come with comments, do we support deleting tweets?

As you go through, add notes in “Not Dos”, and “Functional Spec”. If a similar system comes to mind that you would research if you had more time, note it down in “Related Problems”

As you do this, actually draw out, every screen that we will support in our implementation.

For example, for feed, we would

* Draw the home page, including the login box, and a note on what would happen if the user is already logged in
* Draw the screen for the profile, showing the profile info, the list of feeds, how retweets look like

Work with the interviewer here — you’ll end up finding a lot of “not dos”, and get a much better sense of the system we will need to implement, and the tradeoffs that will come as a result.

By the end of this, you will have all the functionality you need to support. Most people get stuck in this interview or jump into coding too quickly, so if you take the time here to plan and come up with a functional specification, you are showing very positive signal to the interviewer.

Once the functional spec is done, you’re ready to move to the next step in the interview!

