import React from "react";
import { render, screen } from "@testing-library/react";
import App from './app';

test("App contains correct text", () => {
    render(<App />);
    const text = screen.getByText("Hello World");
    expect(text).toBeInTheDocument();
})