import _ from "lodash";
import S from "string";
import {Menu} from "semantic-ui-react";
import React, { Component } from "react";
import "./NavMenu.css";

export class NavMenuItem extends Component {
  render() {
    const {level, direction, menuItems, item, branch} = this.props
    let tag, className, innerText, innerHtml
    let submenu = []

    // Iterate through the children of this component and create items for each of them
    _.keys(branch).forEach( (childName) => {
      let childItem
      childItem = menuItems.filter( (menuItem) => {
        return menuItem.name == childName
      })[0]

      if (!childItem) {
        childItem = {
          name: childName,
          href: null
        }
      }

      submenu.push(
        <NavMenuItem key={submenu.length} level={level + 1} direction={direction} menuItems={menuItems} item={childItem} branch={branch[childName]} />
      )
    })

    if (level > 6)
      tag = "h6"
    else
      tag = "h" + level

    // Each of the components includes its own name as a class.
    className = "level-" + level

    // Formulate content
    innerText = item.title ? item.title : S(item.name).humanize().s

    if (item.href) {
      innerHtml = <a href={item.href}>{innerText}</a>
    }
    else {
      innerHtml = <span>{innerText}</span>
    }

    return (
      <Menu.Item className={className} key={item.key}>
        <Menu.Header as={tag}>{innerHtml}</Menu.Header>
        <Menu.Menu className="submenu" children={submenu} />
      </Menu.Item>
    )
  }
}

export default class NavMenu extends Component {
  render() {
    const {menuItems} = this.props
    const direction = "vertical"
    let menu = []
    let menuHierarchy = {}

    menuItems.sort((a, b) => {
      if (a.path < b.path)
        return -1
      if (a.path > b.path)
        return 1
      return 0
    })

    _.forEach(menuItems, (item, i, collection) => {
      let hierarchyPath = []

      if (item.path) {
        _.forEach(item.path, (value, j, fullPath) => {
          if (j == fullPath.length || value == "")
            void(0)
          else
            hierarchyPath = _.concat(hierarchyPath, value)
        })
      }

      hierarchyPath = _.concat(hierarchyPath, item.name)
      menuHierarchy = _.set(menuHierarchy, hierarchyPath, {})
    })

    // Iterate through the children of this component and create items for each of them
    _.keys(menuHierarchy).forEach( (childName) => {
      let item
      item = menuItems.filter( (menuItem) => {
        return menuItem.name == childName
      })[0]

      if (!item) {
        item = {
          name: childName,
          href: null
        }
      }

      menu.push(
        <NavMenuItem key={menu.length} level={1} direction={direction} menuItems={menuItems} item={item} branch={menuHierarchy[childName]} />
      )
    })

    return (
      <div className="nav-menu">
        <Menu as="nav" children={menu} />
      </div>
    );
  }
}
