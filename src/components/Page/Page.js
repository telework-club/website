import React from "react";
import PropTypes from "prop-types";

import Headline from "../Article/Headline";
import Bodytext from "../Article/Bodytext";
import Sponsors from "../Article/SponsorBodytext";

const Page = (props) => {
  const {
    page: {
      html,
      frontmatter: { title },
      fields,
    },
    theme,
  } = props;

  return (
    <React.Fragment>
      <header>
        <Headline title={title} theme={theme} />
      </header>
      {fields.slug === "/sponsors/" ? (
        <Sponsors html={html} theme={theme} />
      ) : (
        <Bodytext html={html} theme={theme} />
      )}
    </React.Fragment>
  );
};

Page.propTypes = {
  page: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default Page;
