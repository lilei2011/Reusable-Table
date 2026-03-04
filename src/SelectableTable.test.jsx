import { describe, expect, it, vi, afterEach } from "vitest";
import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SelectableTable from "./SelectableTable";
import basicData from "./data/basicData";

describe("SelectableTable", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it("renders without selection controls when isSelectable is false", () => {
    const { queryByRole, queryByLabelText } = render(
      <SelectableTable
        data={basicData}
        name="Basic Data"
        isSelectable={false}
      />,
    );

    expect(
      queryByRole("button", { name: /download selected/i }),
    ).not.toBeInTheDocument();
    expect(queryByLabelText(/select-all/i)).not.toBeInTheDocument();
  });

  it("disables download button until an available row is selected", async () => {
    const { getByRole, getByLabelText } = render(
      <SelectableTable data={basicData} name="Basic Data" />,
    );

    const downloadButton = getByRole("button", {
      name: /download selected/i,
    });
    expect(downloadButton).toBeDisabled();

    await userEvent.click(getByLabelText("Select row netsh.exe"));
    expect(downloadButton).toBeEnabled();
  });

  it("select-all checkbox toggles all rows and label text", async () => {
    const { getByRole, getByText } = render(
      <SelectableTable data={basicData} name="Basic Data" />,
    );

    const selectAll = getByRole("checkbox", { name: /none selected/i });
    expect(selectAll).not.toBeChecked();

    await userEvent.click(selectAll);

    expect(selectAll).toBeChecked();
    expect(getByText("Selected All")).toBeInTheDocument();

    await userEvent.click(selectAll);

    expect(selectAll).not.toBeChecked();
    expect(getByText("None selected")).toBeInTheDocument();
  });

  it("marks select-all as indeterminate when some but not all rows are selected", async () => {
    const { getByRole, getByLabelText, getByText } = render(
      <SelectableTable data={basicData} name="Basic Data" />,
    );

    const selectAll = getByRole("checkbox", { name: /none selected/i });

    await userEvent.click(getByLabelText("Select row netsh.exe"));

    expect(selectAll.indeterminate).toBe(true);
    expect(selectAll).not.toBeChecked();
    expect(getByText("Selected 1")).toBeInTheDocument();
  });
});
