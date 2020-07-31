import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import { request } from "graphql-request";
import MarkDown from "react-markdown";

const queryStr = `query{
  topics(node: 2, onlyLatest: false){
      id
      title
      content
  }
}`;

const LivePage = (props) => {
  const {
    data: {
      site: {
        siteMetadata: { topicAPIEndPoint },
      },
    },
  } = props;
  console.log(topicAPIEndPoint);
  const [topics, setTopics] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (loaded) {
      return;
    }
    request(topicAPIEndPoint, queryStr).then((res) => {
      setTopics(res.topics);
      setLoaded(true);
    });
  }, [loaded]);
  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {(theme) => (
          <Article theme={theme}>
            <header>
              <Headline title="直播" theme={theme} />
            </header>
            {topics.map((topic) => {
              return (
                <div key={topic.id} className="topic-block">
                  <span className="title">{topic.title}</span>
                  <hr />
                  <MarkDown source={topic.content} />
                </div>
              );
            })}
          </Article>
        )}
      </ThemeContext.Consumer>
      <style jsx>{`
        span.title {
          font-weight: bold;
          font-size: 2.5rem;
        }
        .topic-block {
          margin-bottom: 1rem;
        }
      `}</style>
    </React.Fragment>
  );
};

LivePage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default LivePage;
// eslint-disable-next-line no-undef
export const query = graphql`
  query LiveQuery {
    site {
      siteMetadata {
        topicAPIEndPoint
      }
    }
  }
`;
