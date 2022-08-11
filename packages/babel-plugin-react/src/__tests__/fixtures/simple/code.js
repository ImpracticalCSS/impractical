import styled from "@impractical/react";

const something = {
    color: {
        hey: "red"
    }
};

export const Header = styled.h1`
    width: 500px;
    color: ${something.hey.red};
`;