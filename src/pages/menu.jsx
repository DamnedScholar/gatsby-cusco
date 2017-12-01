import _ from "lodash";
import moment from 'moment'
import React, { Component } from "react";
import Helmet from "react-helmet";
import RestaurantMenu from '../components/RestaurantMenu/RestaurantMenu'
import config from "../../data/SiteConfig";

const fourOhFour = {
  html: "<h3>This page seems to exist, but doesn't have any content yet. I'm sure that we're working on filling it right now. Sorry for the inconvenience.</h3>",
  fileNode: { changeTime: "2017-11-15" }
};

class MenuPage extends Component {
  render() {
    let pageData;


    if (!pageData)
      pageData = fourOhFour

    return (
      <article className="menu">
        <Helmet title={`Menu | ${config.siteTitle}`} >
          <meta name="dcterms.issued" value={pubDate.format('YYYY MM DD')} />
          <link rel="schema.dcterms" href="http://purl.org/dc/terms/" />
        </Helmet>

        {JSON.stringify(pageData)}
      </article>
    );
  }
}

export default AboutPage;

/* eslint no-undef: "off"*/
// export const pageQuery = graphql`
//   query MenuQuery {
//     menuYaml {
//       id
//       internal {
//         type
//       }
//       parent {
//         id
//       }
//     }
//   }
// `;
