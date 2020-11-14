import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usePlayerState } from "../../contexts/player";


import {
  Background,
  Feature,
  FeatureCallOut,
  Container,
  Logo,
  ButtonLink,
  Text,
  TextLink,
  Group,
  Picture,
  Profile,
  Dropdown,
  Search,
  SearchIcon,
  SearchInput,
  PlayButton,
} from "./styles/header";

export default function Header({ bg = true, children, ...restProps }) {
  return bg ? <Background {...restProps}>{children}</Background> : children;
}

Header.Feature = ({ children, ...restProps }) => (
  <Feature {...restProps}>{children}</Feature>
);

Header.FeatureCallOut = ({ children, ...restProps }) => (
  <FeatureCallOut {...restProps}>{children}</FeatureCallOut>
);

Header.Profile = ({ children, ...restProps }) => (
  <Profile {...restProps}>{children}</Profile>
);

Header.Dropdown = ({ children, ...restProps }) => (
  <Dropdown {...restProps}>{children}</Dropdown>
);

Header.PlayButton = function HeaderPlayButton({ children, movieTitle, ...restProps }) {
  const { setSelectedMovieTitle, setShowPlayer, showPlayer } = usePlayerState();

  const handleClick = (title) => {
    setSelectedMovieTitle(title)
    setShowPlayer(true)
  }
  return <PlayButton {...restProps} onClick={() => handleClick(movieTitle)}>{children}</PlayButton>

}

Header.Picture = ({ src, ...restProps }) => (
  <Picture {...restProps} src={`/images/users/${src}.png`} />
);

Header.Search = function HeaderSearch({
  searchTerm,
  setSearchTerm,
  setLoadMoreMovies,
  ...restProps
}) {
  const [searchActive, setSearchActive] = useState(false);

  const handleChange = (value) => {
    if (!searchTerm) {
      setLoadMoreMovies(true);
    }
    setSearchTerm(value);
    setLoadMoreMovies(false);
  }

  const handleSearchShow = () => {
    if (searchActive) {
      setSearchTerm("");
      setLoadMoreMovies(true);
    }
    setSearchActive((searchActive) => !searchActive)

  }

  return (
    <Search {...restProps}>
      <SearchIcon
        onClick={() => handleSearchShow()}>
        <img src="/images/icons/search.png" alt="Search" />
      </SearchIcon>
      <SearchInput
        value={searchTerm}
        onChange={({ target }) => handleChange(target.value)}
        placeholder="Search films and series"
        active={searchActive}
      />
    </Search>
  );
};

Header.Text = ({ children, ...restProps }) => (
  <Text {...restProps}>{children}</Text>
);

Header.TextLink = ({ children, ...restProps }) => (
  <TextLink {...restProps}>{children}</TextLink>
);

Header.Frame = function HeaderFrame({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
};

Header.Group = ({ children, ...restProps }) => {
  return <Group {...restProps}>{children}</Group>;
};

Header.Logo = function HeaderLogo({ to, ...restProps }) {
  return (
    <Link to={to}>
      <Logo {...restProps} />
    </Link>
  );
};

Header.ButtonLink = function HeaderButtonLink({ children, ...restProps }) {
  return <ButtonLink {...restProps}>{children}</ButtonLink>;
};
