import React from "react";
import '../styles/About.css';




class About extends React.Component {

    constructor(props) {
        super(props);
      };    //  end of constructor

    render () {

        return (
            <div className="about">
                <h2 className="primaryHeadline" > -  Immrama  -</h2>
                <h4 className="aboutHeadlines" >Share Your Journey</h4>
            
                <h3 className="aboutHeadlines" >About</h3>
                <h4>What are 'immrama'? (The singular is 'immram'.)</h4>

                <p>Immrama are a class of old Irish stories about a hero on an otherworldly seafaring journey. Typically, they involve the hero voyaging from one fantastic island to the next before reaching his final destination... the Otherworld. (Or, in Irish mythology, either Tir na nOg or Mag Mell.)</p>

                <p>Essentially these are stories about adventure. The Irish tale which is probably the most accessible to the modern reader would be The Navagatio... the Voyage of St. Brendan the Navigator. (I find that The Odyssey is very similar in structure, although Odysseus was just trying to get home to Ithica after the Trojan War.)</p>

                <h4>What is the connection between an old Irish tale of adventure and this site?</h4>

                <p>While most people who travel now fly, that is actually very similar to a sea voyage. The (air) ship still has a captain and there are passengers. (And there is certainly still 'steerage' for the majority of us.) And we still travel from place to place. However, we are now rarely on a quest or seeking adventure; although... maybe we should be.</p>

                <p>Instead of writing a travel blog, share a story about your adventures while you were traveling. Tell us where you went and why and then something interesting that happened. Attach a picture or a video or both and share your adventure with others.</p>

                <p>Not a traveller?  Maybe you have another journey you have been on.  Starting a new job.  Loosing weight.  Two weeks in quarantine and what you did to occupy your time.  Learning to play an instrument.  Those are all a kind of journey.  You can share those stories as well.</p>

                <h4 className="aboutHeadlines" >What is your immram?</h4>

            </div>

        );  //  end of return
    };  //  end of render
};  //  end of About class

export default About;