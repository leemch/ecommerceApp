import React from "react";
import Strapi from "strapi-sdk-javascript/build/main";
import {Box, Heading, Text, Card, Button, Image} from 'gestalt';
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);


class Brews extends React.Component {

    state = {
        brews: [],
        brand: ""
    }

async componentDidMount() {

    try{
        const response = await strapi.request("POST", "/graphql", {
            data: {
            query: `query {
                brand(id: "${this.props.match.params.brandId}") {
                _id
                name
                brews {
                  _id
                  name
                  description
                  image{
                    url
                  }
                  price
                }
              }
            }`
            }
        });
        console.log(response);
        this.setState({
            brews: response.data.brand.brews,
            brand: response.data.brand.name
        })

    } catch(error) {
        console.error(error);
    }
}

    render() {
        const {brand, brews} = this.state;
        return(
            <Box
            marginTop={4}
            display="flex"
            justifyContent="center"
            alignItems="start"
            >

            {/* brews section */}
                <Box display="flex" direction="column" alignItems="center">

                    {/* Brews Heading */}
                    <Box margin={2}>
                        <Heading color="orchid">{brand}</Heading>
                    </Box>

                    {/* Brews */}
                    <Box
                    dangerouslySetInlineStyle={{
                        __style: {
                            backgroundColor: "#bdcdd9"
                        }
                    }}
                    shape= "rounded"
                    display= "flex"
                    justifyContent="center"
                    padding={4}
                    wrap
                    >

                    {brews.map(brew =>(
                                        <Box
                            key={brew._id}
                            width={210}
                            margin={2}
                            paddingY={4}
                            >
                            <Card
                                image={
                                <Box height={200} width={200}>
                                    <Image
                                    fit="cover"
                                    alt="Brew"
                                    naturalHeight={1}
                                    naturalWidth={1}
                                    src={`${apiUrl}${brew.image.url}`}
                                    >

                                    </Image>
                                </Box>
                                }
                            >
                            <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            direction="column">

                            <Box marginBottom={2}>
                                <Text bold size="xl">{brew.name}</Text>
                            </Box>

                            <Text>{brew.description}</Text>
                            <Text color="orchid">${brew.price}</Text>
                                <Box marginTop={2}>
                                    <Text size="xl">
                                        <Button color="blue" text="Add to Cart" />
                                    </Text>
                                </Box>
                            </Box>

                            </Card>
                            </Box>
                    ))}


                    </Box>

                </Box>

            </Box>
        );
    }
}
export default Brews;