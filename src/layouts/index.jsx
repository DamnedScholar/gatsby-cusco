import _ from "lodash";
import React from "react";
import Helmet from "react-helmet";
import {Container, Grid, Image, Menu} from "semantic-ui-react";
import config from "../../data/SiteConfig";
import NavMenu from "../components/NavMenu/NavMenu";
import './semantic.min.css';

// Import logo assets
import logo from '../../design/logo-bowl.png'
import augustus from '../../design/fonts/augustus_beveled-webfont.eot'
import stonepath from '../../design/fonts/stonepath-webfont.eot'
//import "./logo.css";

import "./index.sass";

function humanize(str) {
  return str
      .replace(/^[\s_]+|[\s_]+$/g, '')
      .replace(/[_\s]+/g, ' ')
      .replace(/^[a-z]/, function(m) { return m.toUpperCase(); });
}

export default class MainLayout extends React.Component {
  getLocalTitle() {
    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const pathPrefix = config.pathPrefix ? config.pathPrefix : "/";
    const currentPath = this.props.location.pathname
      .replace(pathPrefix, "")
      .replace("/", "");
    let title = "";
    if (currentPath === "") {
      title = "Home";
    } else if (currentPath === "menu/") {
      title = "Menu";
    } else if (currentPath === "tags/") {
      title = "Tags";
    } else if (currentPath === "categories/") {
      title = "Categories";
    } else if (currentPath === "about/") {
      title = "About";
    } else if (currentPath.includes("posts")) {
      title = "Article";
    } else if (currentPath.includes("tags/")) {
      const tag = currentPath
        .replace("tags/", "")
        .replace("/", "")
        .replace("-", " ");
      title = `Tagged in ${capitalize(tag)}`;
    } else if (currentPath.includes("categories/")) {
      const category = currentPath
        .replace("categories/", "")
        .replace("/", "")
        .replace("-", " ");
      title = `${capitalize(category)}`;
    }
    return title;
  }

  render() {
    const {children} = this.props;
    let menuItems = []

    _.forEach(
      this.props.data.allMarkdownRemark.edges,
      (value, key, collection) => {
        if (value.node.fields.source == "pages") {
          let name = value.node.fields.parsedFilePath.name.toLowerCase()
          let path = value.node.fields.parsedFilePath.dir.toLowerCase().replace(/(^(\\\\|\/)|(\\\\|\/)$)/, "")
          let title = value.node.frontmatter.title

          menuItems.push({
            key: key,
            title: title,
            path: path.split(/\\\\|\//),
            name: name,
            href: config.siteUrl + (path ? "/" + path : "") + "/" + (name ? name : ""),
            text: title ? title : humanize(name)
          })
        }
      }
    )

    let directionality = ['right', 'down', 'down']

    return (
      <Container>
        <Helmet>
          <title>{`${config.siteTitle} |  ${this.getLocalTitle()}`}</title>
          <meta name="description" content={config.siteDescription} />
        </Helmet>
        <div className="site-head">
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <span className="cafe">Café</span><br />
                <span clamassNe="cusco">Cusco</span>
              </Grid.Column>
              <Grid.Column>
                <Image src={logo} className="logo" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <NavMenu menuItems={menuItems} directionality={directionality} />
        </div>
        {children()}
      </Container>
    );
  }
}

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query LayoutQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
          }
          fields {
            slug
            source
            parsedFilePath {
              name
              dir
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
