// Home.tsx
import React from 'react';
import { Typography, Container, Paper } from '@mui/material';

const Services: React.FC = () => {
  return (
    <Container>
      <Paper
        elevation={3}
        style={{
          padding: '16px',
          margin: 'auto',
          marginTop: '32px',
          maxWidth: '800px',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Zelaze: Connecting Generosity and Needs
        </Typography>

        <Typography variant="h5" gutterBottom>
          Uniting for National Solidarity
        </Typography>
        
        <Typography paragraph>
          Zelaze is more than just a platform; it's a community for individuals
          like you, mindful of their fellow beings and proactive in making
          today a better world. Recognizing that true happiness is intertwined
          with our connections and that success is most meaningful when shared,
          you have found a place where your actions matter.
        </Typography>

        <Typography paragraph>
                    
            We are all united and responsible for one another.
            Zelaze serves as the hub for national solidarity, offering clear visibility on the needs of people by updating and geolocating them. The platform brings together those who want to contribute to improving living conditions with those currently in need.
            Zelaze ensures that assistance is distributed directly to those in need, eliminating intermediaries and avoiding duplication. It's an intuitive platform that is easy to use for people of all ages.
            To the creative and compassionate individuals with ideas, means, time, expertise, or added value that could benefit others. Zelaze is the platform where you can make a difference. It connects those who need technical, practical, temporary,
            or sustained assistance with willing volunteers.
         </Typography>
        
        <Typography paragraph>
            Are you eager to volunteer but unsure of where to begin? Zelaze offers a variety of projects appealing to diverse personalities. Your involvement will make you
            feel useful and bring direct recognition from those you assist.
            For those who are frequently asked to help but question the appropriateness of their assistance, Zelaze facilitates direct contact with people in need.
            If you want to contribute voluntarily, create a page with your offer to inform those in need.
            If you're unsure how to help, explore categories or geographical locations to get involved in existing projects.
            </Typography>
        
            <Typography paragraph>
            Similarly, if you have specific or recurring needs, Zelaze provides a solution by cataloging individual or collective needs, precisely pinpointing and regularly updating them, it connects you with kind souls eager to be of service.
            If you need something specific you can search for offers already posted, or it might more relevant to create a page with your needs if its more consequent than just a second hand strowler.
            Importantly, no financial assistance can be requested or granted through this platform. Zelaze is dedicated to the selfless act of giving, fostering a united and compassionate community – a promise of a responsible tomorrow.
            Driven by unconditional love and the desire to give, Zelaze is where people selflessly contribute, ensuring that every service is accompanied by a generous heart – a guarantee of success and world improvement.
                
        </Typography>
      </Paper>
    </Container>
  );
};

export default Services;
