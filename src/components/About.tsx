import { FunctionComponent } from "react";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  return (
    <>
      <div className="container mt-4 col-md-4 text-center">
        <h5 className="display-3 text-center m-5">About Us</h5>
        <p className="text-center">
          The <small className="text-success">'My business card' (MBC) </small>
          Group was established to help business owners represent their
          business.
          <br /> The representation is done, among other things, by creating a
          representative card for the business, with relevant information about
          the business.
        </p>
      </div>
    </>
  );
};

export default About;
