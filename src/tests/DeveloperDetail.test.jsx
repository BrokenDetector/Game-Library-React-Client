import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import DeveloperDelete from "../pages/DeveloperDelete";
import DeveloperDetail from "../pages/DeveloperDetail";
import DeveloperForm from "../pages/DeveloperForm";

describe("Developer Detail page", () => {
    it("renders Developer name", async () => {
        render(
            <MemoryRouter initialEntries={["/developer/Innersloth"]}>
                <Routes>
                    <Route path="/developer/Innersloth" element={<DeveloperDetail />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Innersloth")).toBeInTheDocument();
        });
    });

    it("renders Developer not found", async () => {
        render(
            <MemoryRouter initialEntries={["/developer/random"]}>
                <Routes>
                    <Route path="/developer/random" element={<DeveloperDetail />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Developer not Found")).toBeInTheDocument();
        });
    });

    it("render Developer with games delete page", async () => {
        render(
            <MemoryRouter initialEntries={["/developer/Innersloth"]}>
                <Routes>
                    <Route path="/developer/Innersloth" element={<DeveloperDetail />} />
                    <Route path="/developer/Innersloth/delete" element={<DeveloperDelete />} />
                </Routes>
            </MemoryRouter>
        );
        await waitFor(() => {
            userEvent.click(screen.getByText("Delete"));
        });
        await waitFor(() => {
            expect(screen.getByText("Delete the following games before attempting to delete this developer.")).toBeInTheDocument();
        });
    });

    it("render Developer without games delete page", async () => {
        render(
            <MemoryRouter initialEntries={["/developer/Noname"]}>
                <Routes>
                    <Route path="/developer/Noname" element={<DeveloperDetail />} />
                    <Route path="/developer/Noname/delete" element={<DeveloperDelete />} />
                </Routes>
            </MemoryRouter>
        );
        await waitFor(() => {
            userEvent.click(screen.getByText("Delete"));
        });
        await waitFor(() => {
            expect(screen.getByText("Are you sure you want to delete this developer?")).toBeInTheDocument();
        });
    });

    it("render Developer update page", async () => {
        render(
            <MemoryRouter initialEntries={["/developer/Innersloth"]}>
                <Routes>
                    <Route path="/developer/Innersloth" element={<DeveloperDetail />} />
                    <Route path="/developer/Innersloth/update" element={<DeveloperForm />} />
                </Routes>
            </MemoryRouter>
        );
        await waitFor(() => {
            userEvent.click(screen.getByText("Update"));
        });
        await waitFor(() => {
            expect(screen.getByPlaceholderText("Developer name")).toHaveValue("Innersloth");
        });
    });
});
