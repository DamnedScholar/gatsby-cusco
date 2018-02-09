import _ from "lodash";
import moment from 'moment'
import React, { Component } from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";

const fourOhFour = {
  html: "<h3>This page seems to exist, but doesn't have any content yet. I'm sure that we're working on filling it right now. Sorry for the inconvenience.</h3>",
  fileNode: { changeTime: "2017-11-15" }
};
// Comment
class TourPage extends Component {
  render() {
    let pageData;

    _.forEach(
      this.props.data.allMarkdownRemark.edges,
      (value, key, collection) => {
        if (value.node.fields.slug == "/tour/")
          pageData = value.node
      }
    )

    return (
      <article className="about">
        <Helmet title={`Tour | ${config.siteTitle}`} >
          <link rel="schema.dcterms" href="http://purl.org/dc/terms/" />
        </Helmet>

        <div dangerouslySetInnerHTML={{ __html: pageData.html }} />

        <div id="vtour_canvascafecusco" />
      </article>
    );
  }
}

export default TourPage;

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query TourQuery {
    allMarkdownRemark {
      edges {
        node {
          html
          fields {
            slug
            source
            parsedFilePath {
              name
            }
            fileNode {
              changeTime
            }
          }
      	}
      }
    }
  }
`;
