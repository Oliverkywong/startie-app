import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import UserTeams from "./UserTeams";

test("test user team component", async () => {
  const onQuitTeamSpy = jest.fn();

  // ARRANGE
  render(<UserTeams team={[]} onQuitTeam={onQuitTeamSpy} />);

  // ACT
  await userEvent.click(screen.getByText("Quit Team"));

  // ASSERT
  expect(onQuitTeamSpy).toHaveBeenCalled();
  expect(screen.getByRole("img")).toHaveAttribute(
    "src",
    "http://localhost/userUploadedFiles/test.png"
  );
  expect(screen.getByRole("span")).toHaveTextContent("asdf asdf asdf");
});
