import React from "react";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import '../styles/ContactUs.css';


class ContactUs extends React.Component {

    constructor(props) {
        super(props);
      };    //  end of constructor

    render () {

        return (
            <div className="contactForm">
            <h2> -  Contact Us  -</h2>
            <div className="centerMe">
                <Form id="fs-frm" name="simple-contact-form" acceptCharset="utf-8" action="https://formspree.io/f/xnqovbrl" method="post">
                    <FormGroup id="fs-frm-inputs">
                        <Label for="full-name" className="formLabels">Full Name</Label>
                        <Input type="text" name="name" id="full-name" placeholder="First and Last" required />
                        <Label for="email-address" className="formLabels">Email Address</Label>
                        <Input type="email" name="_replyto" id="email-address" placeholder="email@domain.tld" required />
                        <Label for="message" className="formLabels">Message</Label>
                        <br/>
                        <textarea rows="5" cols="40" name="message" id="message" placeholder="Thoughts, Questions, Suggestions or Concerns?" required />
                        <Input type="hidden" name="_subject" id="email-subject" value="Contact Form Submission" />
                    </FormGroup>
                    <Input type="submit" value="Submit" id="inputButton"/>
                </Form>
                </div>
            </div>
        );  //  end of return
    };  //  end of render
};  //  end of About class

export default ContactUs;