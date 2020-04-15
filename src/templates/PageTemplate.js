import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Seo from "../components/Seo";
import Article from "../components/Article";
import Page from "../components/Page";
import { ThemeContext } from "../layouts";

const PageTemplate = (props) => {
  const {
    data: {
      page,
      site: {
        siteMetadata: { facebook },
      },
    },
  } = props;
  const classname = page.fields.slug.replace(/\//g, "");
  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {(theme) => (
          <Article theme={theme} className={classname}>
            <Page page={page} theme={theme} />
          </Article>
        )}
      </ThemeContext.Consumer>

      <Seo data={page} facebook={facebook} />
    </React.Fragment>
  );
};

PageTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PageTemplate;

// eslint-disable-next-line no-undef
export const pageQuery = graphql`
  query PageByPath($slug: String!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
