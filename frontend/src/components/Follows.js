import React from "react"
import { Link as ProfileLink } from "react-router-dom"
import { useQuery } from "@apollo/react-hooks"
import { Box, Avatar, Text, Divider, Flex, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"

import { FETCH_USER_QUERY } from "../graphql/FETCH_USER_QUERY"

export default function Follows({target_user}){
  const { loading, data } = useQuery(FETCH_USER_QUERY, { variables: { userId: target_user.id }})

  return loading ? "loading" : (
    <Box p={12} minW="325px" maxW="325px" borderWidth={1} borderRadius={12} boxShadow="sm">
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab fontSize="xl" fontWeight="bold" _focus="outline: 0">Following</Tab>
          <Tab fontSize="xl" fontWeight="bold" _focus="outline: 0">Followers</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {data?.getUser.following.map((target) => 
              <Box key={target.id}>
                <Flex align="center">
                  <Avatar size="lg" name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
                  <Box ml={4}>
                    <Text fontSize="lg" fontWeight="semibold" color="teal.500" as={ProfileLink} to={`/${target.username}`}>{target.username}</Text>
                    <Text fontSize="lg" fontWeight="light">@{target.username}</Text>
                  </Box>
                </Flex>
                <Divider my={2}/>
              </Box>
            )}
          </TabPanel>

          <TabPanel>
            {data?.getUser.followers.map((target) => 
              <Box key={target.id}>
                <Flex align="center">
                  <Avatar size="lg" name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
                  <Box ml={4}>
                    <Text fontSize="lg" fontWeight="semibold" color="teal.500" as={ProfileLink} to={`/${target.username}`}>{target.username}</Text>
                    <Text fontSize="lg" fontWeight="light">@{target.username}</Text>
                  </Box>
                </Flex>
                <Divider my={2}/>
              </Box>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )

}