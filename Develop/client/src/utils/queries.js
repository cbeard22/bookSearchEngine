import { gbl } from '@apollo/client';

export const GET_BOOK = gbl`
query {
    book{
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