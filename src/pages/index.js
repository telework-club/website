import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import { ThemeContext } from "../layouts";
import Blog from "../components/Blog";
import Hero from "../components/Hero";
import Seo from "../components/Seo";
import { Row, Col, Card } from "antd";
import "antd/lib/grid/style/index.css";
import "antd/lib/card/style/index.css";
import { navigate } from "gatsby";

const { Meta } = Card;

class IndexPage extends React.Component {
  separator = React.createRef();

  scrollToContent = (e) => {
    this.separator.current.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  gotoIntro = (r) => {
    navigate(r);
  };

  render() {
    const {
      data: {
        intro1: {
          childImageSharp: {
            resize: { src: imgIntro1 },
          },
        },
        intro2: {
          childImageSharp: {
            resize: { src: imgIntro2 },
          },
        },
        intro3: {
          childImageSharp: {
            resize: { src: imgIntro3 },
          },
        },
        posts: { edges: posts = [] },
        bgDesktop: {
          resize: { src: desktop },
        },
        bgTablet: {
          resize: { src: tablet },
        },
        bgMobile: {
          resize: { src: mobile },
        },
        site: {
          siteMetadata: { facebook },
        },
      },
    } = this.props;

    const backgrounds = {
      desktop,
      tablet,
      mobile,
    };

    return (
      <React.Fragment>
        <ThemeContext.Consumer>
          {(theme) => (
            <Hero scrollToContent={this.scrollToContent} backgrounds={backgrounds} theme={theme} />
          )}
        </ThemeContext.Consumer>

        <hr ref={this.separator} />

        <ThemeContext.Consumer>
          {(theme) => (
            <div className="main-intro">
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                  <Card
                    style={{ height: 450 }}
                    hoverable={true}
                    cover={<img src={imgIntro1} alt="什么是远程工作" />}
                    onClick={() => this.gotoIntro("/specials/what-is-telework/")}
                  >
                    <h3>什么是远程工作</h3>
                    <br />
                    <p>
                      远程工作不是简单的离开固定的办公场所那么简单，远程的真正含义是协作方式上的延伸，以及由此带来管理上的变化。
                    </p>
                  </Card>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                  <Card
                    style={{ height: 450 }}
                    hoverable={true}
                    cover={<img src={imgIntro2} alt="为什么要远程工作" />}
                    onClick={() => this.gotoIntro("/specials/why-telework/")}
                  >
                    <h3>为什么要远程工作</h3>
                    <br />
                    <p>
                      远程的方式，可以突破地域和时空的限制，从而让整个团队乃至公司的运行效率更有突破性，采用远程，某种意义上可以让组织的灵敏性变高，进而快速应对变化。
                    </p>
                  </Card>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                  <Card
                    style={{ height: 450 }}
                    hoverable={true}
                    cover={<img src={imgIntro3} alt="远程工作是否适合" />}
                    onClick={() => this.gotoIntro("/specials/what-telework-suit/")}
                  >
                    <h3>远程工作是否适合</h3>
                    <br />
                    <p>
                      就像万事没有银弹一样，远程并非适合所有的行业和职位，是在一定限制框架下的工作方式转变，这种限制一旦突破，将引领新的工作方式变革。
                    </p>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
        </ThemeContext.Consumer>

        <ThemeContext.Consumer>
          {(theme) => <Blog posts={posts} theme={theme} />}
        </ThemeContext.Consumer>

        <Seo facebook={facebook} />

        <style jsx>{`
          hr {
            margin: 0;
            border: 0;
          }
          .main-intro {
            margin-top: 30px;
            max-width: 1600px;
            padding-left: 30px;
            padding-right: 30px;
            margin-left: auto;
            margin-right: auto;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default IndexPage;

// eslint-disable-next-line no-undef
export const query = graphql`
  query IndexQuery {
    intro1: file(relativePath: { eq: "jpg/intro1.jpg" }) {
      childImageSharp {
        resize(height: 250, width: 450, fit: COVER) {
          src
        }
      }
    }
    intro2: file(relativePath: { eq: "jpg/intro2.jpg" }) {
      childImageSharp {
        resize(height: 250, width: 450, fit: COVER) {
          src
        }
      }
    }
    intro3: file(relativePath: { eq: "jpg/intro3.jpg" }) {
      childImageSharp {
        resize(height: 250, width: 450, fit: COVER) {
          src
        }
      }
    }
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//posts/[0-9]+.*--/" } }
      sort: { fields: [fields___prefix], order: DESC }
    ) {
      edges {
        node {
          excerpt(pruneLength: 100, truncate: true)
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            category
            author
            cover {
              children {
                ... on ImageSharp {
                  fluid(maxWidth: 800, maxHeight: 360) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
    bgDesktop: imageSharp(fluid: { originalName: { regex: "/hero-background/" } }) {
      resize(width: 1200, quality: 90, cropFocus: CENTER) {
        src
      }
    }
    bgTablet: imageSharp(fluid: { originalName: { regex: "/hero-background/" } }) {
      resize(width: 800, height: 1100, quality: 90, cropFocus: CENTER) {
        src
      }
    }
    bgMobile: imageSharp(fluid: { originalName: { regex: "/hero-background/" } }) {
      resize(width: 450, height: 850, quality: 90, cropFocus: CENTER) {
        src
      }
    }
  }
`;

// hero-background
