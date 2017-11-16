import React from "react";
import Helmet from "react-helmet";
import SocialLinks from "../components/SocialLinks/SocialLinks";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import "./b16-tomorrow-dark.css";

export default class PostTemplate extends React.Component {
  render() {
    const { slug } = this.props.pathContext;
    const pageNode = this.props.data.markdownRemark;
    const page = pageNode.frontmatter;
    if (!page.id) {
      page.id = slug;
    }
    if (!page.id) {
      page.category_id = config.pageDefaultCategoryID;
    }
    return (
      <div>
        <Helmet>
          <title>{`${page.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <div>
          <SEO postPath={slug} postNode={pageNode} postSEO />
        </div>
      </div>
    );
  }
}
