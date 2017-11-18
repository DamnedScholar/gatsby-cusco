import _ from "lodash";
import moment from 'moment'
import React, { Component } from "react";
import Helmet from "react-helmet";
import About from "../components/About/About";
import config from "../../data/SiteConfig";

const fourOhFour = {
  html: "<h3>This page seems to exist, but doesn't have any content yet. I'm sure that we're working on filling it right now. Sorry for the inconvenience.</h3>",
  fileNode: { changeTime: "2017-11-15" }
};

class AboutPage extends Component {
  render() {
    let pageData;

    _.forEach(
      this.props.data.allMarkdownRemark.edges,
      (value, key, collection) => {
        if (value.node.fields.slug == "/about/")
          pageData = value.node
      }
    )
    if (!pageData)
      pageData = fourOhFour

    let pubDate = moment(pageData.fields.fileNode.changeTime)

    return (
      <article className="about">
        <Helmet title={`About | ${config.siteTitle}`} >
          <meta name="dcterms.issued" value={pubDate.format('YYYY MM DD')} />
          <link rel="schema.dcterms" href="http://purl.org/dc/terms/" />
        </Helmet>

        <div dangerouslySetInnerHTML={{ __html: pageData.html }} />
      </article>
    );
  }
}

export default AboutPage;

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query AboutQuery {
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
