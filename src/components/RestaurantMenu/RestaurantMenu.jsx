import _ from "lodash";
import S from "string";
import {Menu} from "semantic-ui-react";
import React, { Component } from "react";
import "./RestaurantMenu.css";

export class MenuItem extends Component {
  render() {
    const {} = this.props
    let tag, submenu, className, innerText, innerHtml

    return (
      <div></div>
    )
  }
}

export default class NavMenu extends Component {
  render() {
    const {menuItems} = this.props
    const direction = "vertical"
    let menu
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
    menu = _.keys(menuHierarchy).map( (childName) => {
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

      return (
        <NavMenuItem level={1} direction={direction} menuItems={menuItems} item={item} branch={menuHierarchy[childName]} />
      )
    })

    return (
      <div className="nav-menu">
        <Menu as="nav" children={menu} />
      </div>
    );
  }
}
