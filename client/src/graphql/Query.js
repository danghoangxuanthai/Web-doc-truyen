import { gql } from "@apollo/client";
export const GET_GEN_3 = gql`
    query getGen3 {
        trendingNow: Page(page: 1, perPage: 100) {
            media(isAdult: false, type: ANIME, sort: TRENDING_DESC) {
                id
                coverImage {
                    extraLarge
                }
                title {
                    english
                }
                description
                genres
                averageScore
                bannerImage
                characters{
                    edges {
                        role
                        node {
                            image {
                                medium
                            }
                            name {
                                first
                                last
                                full
                                native
                            }
                            id
                        }
                        id
                    }
                }
                favourites
                
                
            }
            
        }
    }
`;