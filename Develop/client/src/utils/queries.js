import { gbl } from '@apollo/client';

export const GET_BOOK = gbl`
query {
    me{
        username
        savedBooks {
            title
            description
            authors
            bookID
        }
    }
}
`;  