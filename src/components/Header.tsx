import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Flex, Heading, IconButton } from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTitleClick = () => {
    navigate("/");
  };

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <Flex
      as="header"
      alignItems="center"
      justify="space-between"
      py={6}
      px={10}
      bg="gray.50"
      borderBottom="1px solid black"
    >
      <IconButton
        aria-label="Back"
        icon={<BsArrowLeft />}
        onClick={handleBackClick}
        ml={35}
        size="lg"
        fontSize='20px'
        isDisabled={location.pathname === "/"}
        opacity={location.pathname === "/" ? 0.5 : 1}
      />
      <Heading
        as="h1"
        size="lg"
        onClick={handleTitleClick}
        cursor="pointer"
        flex="1"
        textAlign="center"
      >
        Tasks
      </Heading>
      <Box w="32px"></Box>
    </Flex>
  );
};

export default Header;
