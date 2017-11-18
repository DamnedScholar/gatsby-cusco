import _ from "lodash";
import React from "react";
import Helmet from "react-helmet";
import {Container, Menu} from "semantic-ui-react";
import config from "../../data/SiteConfig";
import "./index.css";

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
    const { children } = this.props;
    let menuItems = []
    let menu = {}
    let menuHierarchy

    _.forEach(
      this.props.data.allMarkdownRemark.edges,
      (value, key, collection) => {
        if (value.node.fields.source == "pages") {
          let name = value.node.fields.parsedFilePath.name.toLowerCase()
          let path = value.node.fields.parsedFilePath.dir.toLowerCase().replace(/(^(\\\\|\/)|(\\\\|\/)$)/, "")
          let title = value.node.frontmatter.title

          menuItems.push({
            index: key,
            title: title,
            path: path.split(/\\\\|\//),
            name: name,
            href: config.siteUrl + (path ? "/" + path : "") + "/" + (name ? name : ""),
            text: title ? title : humanize(name)
          })
        }
      }
    )

    menuItems.sort((a, b) => {
      if (a.path < b.path) {
        return -1
      }
      if (a.path > b.path) {
        return 1
      }
      // If paths are equal
      return 0
    })

    _.forEach(menuItems, (item, i, collection) => {
      let hierarchyPath = ""

      if (item.path) {
        _.forEach(item.path, (value, j, fullPath) => {
          hierarchyPath += "['" + value + "']['subordinates']"
        })
      }

      // Check whether the computed path exists.
      // If not, `update()`. If so, `concat()`.
      let cur = _.get(menuHierarchy, hierarchyPath, false)
      if (cur) {
        console.log("Adding new item to " + hierarchyPath)
        _.concat(cur, item)
      }
      else {
        console.log("Creating " + hierarchyPath)
        let out = _.update(menuHierarchy, hierarchyPath, [item])
        console.log(out)
      }
    })

    console.log(menuHierarchy)

    return (
      <Container>
        <Helmet>
          <title>{`${config.siteTitle} |  ${this.getLocalTitle()}`}</title>
          <meta name="description" content={config.siteDescription} />
        </Helmet>
        <Menu as="nav" items={menuItems}></Menu>
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
