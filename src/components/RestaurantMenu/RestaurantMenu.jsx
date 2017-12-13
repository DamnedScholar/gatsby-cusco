import _ from "lodash";
import S from "string";
import {Grid, Header, Icon, Item} from "semantic-ui-react";
import React, { Component } from "react";
import "./RestaurantMenu.sass";

class MenuItem extends Component {
  render() {
    const {name, details} = this.props
    const {price, description, dietary} = details
    let dietIcons = []

    if (dietary) {
      const diets = {
        vegan: "leaf",
        unknown: "question circle"
      }

      _.forEach(dietary, (diet, i, all) => {
        let icon

        if (diets[diet])
          icon = diets[diet]
        else
          icon = diets.unknown

        dietIcons.push(<Icon name={icon} className={"diet-" + diet} key={i} />)
      })
    }

    return (
      <Item>
        <Header as="h3" className="item-name">{name}</Header>
        <span className="price">{price}</span>
        <article>{description}</article>
        <aside>{dietIcons}</aside>
      </Item>
    )
  }
}

class MenuCategory extends Component {
  render() {
    const {name, items} = this.props
    let catItems = []

    _.forIn(items, (details, name, object) => {
      catItems.push(
        <MenuItem name={name} details={details} />
      )
    })

    return (
      <Grid.Column className="category">
        <Header as="h2" className="category-name">{name}</Header>
        {catItems}
      </Grid.Column>
    )
  }
}

export default class RestaurantMenu extends Component {
  render() {
    const {items} = this.props
    let menuItems = []

    _.forIn(items, (items, name, object) => {
      console.log(items)

      menuItems.push(
        <MenuCategory name={name} items={items} key={menuItems.length} />
      )
    })

    return (
      <Grid className="restaurant-menu" columns={3} stackable>
        <Grid.Row stretched>
          {menuItems}
        </Grid.Row>
      </Grid>
    );
  }
}
