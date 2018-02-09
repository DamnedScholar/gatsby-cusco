import _ from "lodash";
import S from "string";
import {Grid, Header, Icon, Item} from "semantic-ui-react";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import React, { Component } from "react";
import Helmet from 'react-helmet'
import "./RestaurantMenu.sass";

class MenuItem extends Component {
  render() {
    const {name, idKey, parent, details} = this.props
    const {price, description, dietary} = details
    let dietIcons = []

    if (dietary) {
      const diets = {
        vegan: "leaf",
        unknown: "question circle"
      }
      const diets2 = {
        vegan: "leaf",
        unknown: "question-circle"
      }

      _.forEach(dietary, (diet, i, all) => {
        let icon

        if (diets[diet])
          icon = diets[diet]
        else
          icon = diets.unknown

        dietIcons.push(<Icon name={icon} className={"diet-" + diet} key={i} />)

        // if (diets[diet])
        //   icon = diets2[diet]
        // else
        //   icon = diets2.unknown
        // dietIcons.push(<FontAwesomeIcon icon={icon} className={"diet-" + diet} key={i} />)
      })
    }

    let id = parent + "_i" + _.padStart(idKey, 3, '0')

    return (
      <Item id={id}>
        <Header as="h3" className="item-name">{name}</Header>
        <span className="price">{price}</span>
        <section>{description}</section>
        <aside>{dietIcons}</aside>
      </Item>
    )
  }
}

class MenuCategory extends Component {
  render() {
    const {name, items, idKey, parent} = this.props
    let catItems = []
    let i = 0

    // Consider a different name scheme for the `id`s. They don't have to be attractive to humans, just indicate precisely where in the tree a particular element is.
    let id = parent + "_c" + _.padStart(idKey, 3, '0')

    _.forIn(items, (details, name, object) => {
      catItems.push(
        <MenuItem name={name} details={details}
                  key={catItems.length}
                  idKey={catItems.length} parent={id} />
      )
    })

    return (
      <Grid.Column className="category" id={id}>
        <Header as="h2" className="category-name">{name}</Header>
        {catItems}
      </Grid.Column>
    )
  }
}

export default class RestaurantMenu extends Component {
  ariaId(items) {
    // This function is for calculating the `id` attributes of the elements in order to pass them to the browser-side script. I'm making it a separate function because it's important for ARIA integration but not necessary for the normal menu to render. Plus, it's an elegant solution to replace `JSON.stringify()` with my own function that outputs exactly what I want.
    let idList = ["i-menu"]
    let catIndex = 0
    let itemIndex = 0

    _.forIn(items, (entries, category, all) => {
      let catId = "i-menu_c" + _.padStart(catIndex, 3, '0')
      idList.push(
        catId
      )
      catIndex++

      _.forIn(entries, (entry) => {
        idList.push(
          catId + "_i" + _.padStart(itemIndex, 3, '0')
        )
        itemIndex++
      })

      itemIndex = 0
    })

    return JSON.stringify(idList)
  }

  render() {
    const {items} = this.props
    let menuItems = []

    let id = "i-menu"

    const interactiveMenu = require('./scripts/interactive-menu')

    _.forIn(items, (items, name, object) => {
      menuItems.push(
        <MenuCategory name={name} items={items}
                      key={menuItems.length}
                      idKey={menuItems.length} parent={id} />
      )
    })

    return (
      <Grid className="restaurant-menu" columns={3} stackable
        id={id} aria-live="rude">
        <Grid.Row stretched>
          {menuItems}
        </Grid.Row>
        <Helmet script={[
          {
            type: 'text/javascript',
            innerHTML: 'var menuItems = ' + this.ariaId(items)
          },
          {
            type: 'text/javascript',
            innerHTML: 'var interactiveMenu = ' + interactiveMenu.toString() +
                       '\n\ninteractiveMenu().menuInit()'
          }
        ]} />
      </Grid>
    );
  }
}
