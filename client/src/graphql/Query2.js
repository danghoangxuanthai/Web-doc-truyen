import { gql } from "@apollo/client";
export const GET_GEN_2 = gql`
    query getGen2 {
        trendingNow: Page(page: 1, perPage: 100) {
            media(type: ANIME, sort: TRENDING_DESC) {
                id
                coverImage {
                    extraLarge
                    large
                    medium
                    color
                }
            }

        }
    }
`;
