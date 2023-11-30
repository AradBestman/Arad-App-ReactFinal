import React from "react";
import { Box, Typography, Container } from "@mui/material";

const AboutPage = () => {
  return (
    <Container>
      <Typography my={2} variant="h3" color="black" textAlign="center">
        Welcome to Arad App - Connecting You to Local Business Excellence
      </Typography>

      <Box mt={4}>
        <Typography variant="h4" color="black">
          What Sets Us Apart:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              <strong>Curated Selection:</strong> Every business card on our
              site is thoughtfully curated, representing the best of what your
              community has to offer. We take pride in featuring a wide range of
              industries, from cozy cafes to innovative tech startups.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Discover Hidden Gems:</strong> Explore hidden gems that
              you might have overlooked. Our platform is designed to help you
              discover new and exciting businesses right in your backyard.
              Whether you're a local resident or a visitor, there's always
              something new to find.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Support Local:</strong> By using Arad App, you're not just
              browsing business cards – you're actively supporting the local
              economy. We believe in the strength of local commerce, and our
              platform is a testament to the incredible talent and passion that
              local entrepreneurs bring to their work.
            </Typography>
          </li>
        </ul>
      </Box>

      <Box mt={4}>
        <Typography variant="h4" color="black">
          How It Works:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              <strong>Easy Navigation:</strong> Our user-friendly interface
              makes it simple to navigate through the site. Whether you're
              searching for a specific business or just browsing, you'll find
              the information you need effortlessly.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Detailed Business Cards:</strong> Each business card
              provides essential details such as location, contact information,
              a brief description, and customer reviews. Make informed decisions
              about where to shop, dine, and explore.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Interactive Maps:</strong> Plan your visit with our
              interactive maps that pinpoint the exact locations of featured
              businesses. Never miss out on the vibrant experiences your local
              community has to offer.
            </Typography>
          </li>
        </ul>
      </Box>

      <Box mt={4}>
        <Typography variant="h4" color="black">
          Join the Community:
        </Typography>
        <Typography variant="body1">
          Connect with us on social media to stay updated on the latest featured
          businesses, community events, and exclusive promotions. Share your own
          discoveries using our hashtag and become part of a growing network of
          local enthusiasts.
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="h4" color="black">
          Explore. Connect. Support.
        </Typography>
        <Typography variant="body1">Arad App Team</Typography>
      </Box>
    </Container>
  );
};

export default AboutPage;
