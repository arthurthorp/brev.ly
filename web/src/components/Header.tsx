import logo from "../assets/logoWithText.svg";
import { Wrapper } from "./Wrapper";

export function Header() {
  return (
    <header className="w-full flex items-center justify-center md:justify-start mb-6 md:mb-8">
      <Wrapper>
        <img className="w-24" src={logo} alt="brev.ly logo" />
      </Wrapper>
    </header>
  );
}
