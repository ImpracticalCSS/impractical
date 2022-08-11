import React from "react";
import styled from "../styled";
import { render, screen } from '@testing-library/react'

import "@testing-library/jest-dom";

describe("styled()", () => {
    it("should be able to initialize a styled component", () => {
        const Component = styled.h1`
            width: 500px;
            height: ${() => 500}px;
        `;

        const result = render(<Component />);

        expect(result.getByRole("heading", { level: 1 })).toBeInTheDocument();
    })

    it("should be able to wrap another styled component", () => {
        const height = 300;

        const Component = styled.h1`
            width: 500px;
            height: ${({}) => 500}px;
        `;

        const WrappedComponent = styled(Component)`
            width: 500px;
            height: ${height}px;
            color: ${() => "red"};
        `;

        const result = render(<WrappedComponent />);

        expect(result.getByRole("heading", { level: 1 })).toBeInTheDocument();
    })
})