import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import DeveloperDetail from "../pages/DeveloperDetail";
import Developers from "../pages/Developers";

describe("Developers page", () => {
    it("renders Developers name", async () => {
        render(
            <BrowserRouter>
                <Developers />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("All Developers:")).toBeInTheDocument();
        });
    });

    it("shows list of developers", async () => {
        render(
            <BrowserRouter>
                <Developers />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getAllByRole("dev")).toHaveLength(5);
        });
    });

    it("routes to developer page on click", async () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Developers />} />
                    <Route path={"/developer/Innersloth"} element={<DeveloperDetail />} />
                </Routes>
            </BrowserRouter>
        );

        await waitFor(() => {
            userEvent.click(screen.getByText("Innersloth"));
            expect(screen.getByText("Games:")).toBeInTheDocument();
        });
    });
    
});