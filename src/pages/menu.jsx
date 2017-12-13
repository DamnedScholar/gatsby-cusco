import _ from "lodash";
import moment from 'moment'
import yaml from 'js-yaml'
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
    let menuData;

    // file = fs.readFileSync("../../content/pages/menu/restaurantmenu.yml")
    // pageData = yaml.safeLoad(file)
    menuData = {
			"Appetizers": {
				"Fried Guacamole": {
					"description": "Avocado wedges dredged in a mix of blue and yellow corn flour and deep fried, served with pico de gallo.",
					"price": "$7",
					"dietary": ['vegan']
				},
				"Tequeños": {
					"description": "Deep-fried cheese sticks wrapped in pastry wrapper.",
					"price": "$7"
				}
			},
			"Entrees": {
				"Drunken Goat": {
					"description": "A stew of goat, hominy, and spices.",
					"price": "$15"
				}
			},
			"Beverages": {
				"Pisco Sour": {
					"description": "A citrusy, surprisingly creamy cocktail from the Andes.",
					"price": "$4"
				},
				"Fountain Drink": {
					"description": "A stew of goat, hominy, and spices.",
					"price": "$15"
				}
			}
    }

    let pubDate = moment()

    if (!menuData)
      menuData = fourOhFour

    return (
      <article className="menu">
        <Helmet title={`Menu | ${config.siteTitle}`} >
          <meta name="dcterms.issued" value={pubDate.format('YYYY MM DD')} />
          <link rel="schema.dcterms" href="http://purl.org/dc/terms/" />
        </Helmet>

        <RestaurantMenu items={menuData} />
      </article>
    );
  }
}

export default MenuPage;

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query MenuQuery {
    menuYaml {
      id
      internal {
        type
      }
      parent {
        id
      }
    }
  }
`;
