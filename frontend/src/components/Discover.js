import React from "react"
import { Link as ProfileLink } from "react-router-dom"
import { useQuery } from "@apollo/react-hooks"
import { Box, Avatar, Text, Divider, Flex } from "@chakra-ui/react"

import { FETCH_USERS_QUERY } from "../graphql/FETCH_USERS_QUERY"

export default function Discover({ user_data }){
  const { loading, data } = useQuery(FETCH_USERS_QUERY)
  const following = user_data ? user_data.getUser.following.map((x) => x.username) : []

  return loading ? "loading" : (
    <Box p={12} minW="325px" maxW="325px" borderWidth={1} borderRadius={12} boxShadow="sm">
      <Text fontSize="xl" fontWeight="bold" mb={3}>Who to follow</Text>
      <Divider my={2}/>
      {data?.getUsers.filter((target) => (// same as data.getUsers && data.getUsers.map
        following.indexOf(target.username) === -1 && target.username !== user_data?.getUser.username)
      ).map((target) => 
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
    </Box>
  )

}