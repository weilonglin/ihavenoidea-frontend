import gql from "graphql-tag";

export const ALL_RESOURCES = gql `
query allResource {
  allResource {
    id
    name
    link
    description
    category {
      name
    }
    vote {
      id
      resourceId
      userIp
    }
    tags {
      name
    }
  }
}
`;

export const ALL_TAGS = gql `
query allTags {
  allTags {
   name
 }
 }
`

export const ADD_RESOURCE = gql `
mutation addResource(
  $name: String 
  $link: String 
  $description: String
  $category: String
  $resourcetag: [String]
  )
  {
  addResource(input: {
    name: $name, 
    link: $link, 
    description: $description, 
    category: $category, 
    resourcetag: $resourcetag
  })
}
`

export const ALL_CATEGORY = gql `
query allCategories {
  allCategories {
   name
 }
 }
`

export const ALL_VOTES = gql `
query allVotes($userIp: String) {
  allVotes(userIp: $userIp) {
   id
   resourceId
 }
 }
`

export const ADD_VOTE = gql `
mutation addVote(
  $userIp: String
  $resourceId: Int
  ) {
  addVote(
    userIp: $userIp
    resourceId: $resourceId
    )
}
`

export const REMOVE_VOTE = gql `
mutation($id: Int) {
  removeVote(id: $id)
}
`