// TeamMember.ts
type TeamMember = {
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
  };
  
  
  
  import React from 'react';
  
  const teamMembers: TeamMember[] = [
    {
      name: 'Xin',
      role: 'Frontend developper and web designer',
      bio: 'Xin always wanted to push the project to another level, he is a passionate developper with great talent and expertise in web development...',
      imageUrl: 'https://example.com/john-doe-image.jpg',
    },
    {
      name: 'Njama',
      role: 'Backend developper and team leader',
      bio: 'Njama has always the good words to motivate his people and he can crack any beug in one minute, the project owns him a lot! ',
      imageUrl: 'https://example.com/jane-smith-image.jpg',
    },
    {
      name: 'Hava',
      role: 'Backend developper, and strategic operations manager',
      bio: 'At the origin of the project, she led the business side, and coded the development backend.', 
      imageUrl: 'https://example.com/bob-johnson-image.jpg',
    },
  ];
  
  const TeamPresentation: React.FC = () => {
    return (
      <div>
        <h1>Our successful team</h1>
        <div>
          {teamMembers.map((member, index) => (
            <div key={index}>
              <img src={member.imageUrl} alt={member.name} />
              <h2>{member.name}</h2>
              <p>{member.role}</p>
              <p>{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default TeamPresentation;
  