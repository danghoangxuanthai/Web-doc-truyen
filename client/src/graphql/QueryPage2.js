import { gql } from "@apollo/client";
export const GET_GEN_PAGE_2 = gql`
    query getGenPage2 {
        trendingNow: Page(page: 2, perPage: 6) {
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