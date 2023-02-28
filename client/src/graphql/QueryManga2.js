import { gql } from "@apollo/client";
export const GET_GEN_MANGA2 = gql`
    query getGenManga {
        trendingNow: Page(page: 5, perPage: 6) {
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