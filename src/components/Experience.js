// src/data/experiences.js

const experiences = [
    {
      id: 1,
      year: '2024-Present',
      company: 'SquarePlanIT',
      title: 'Software Engineering Intern',
      logo: '/images/squareplanit-icon.jpg',
      mainImage: '/images/s-3.jpeg', // New field for a main image
      content: [
        'Developing and maintaining web applications using React.js.',
        'Collaborating with cross-functional teams including designers and product managers.',
        'Implementing responsive design and ensuring cross-browser compatibility.',
      ],
      description:
        'As a Software Engineering Intern at SquarePlanIT, I contributed to projects that focus on improving user experience and scalability.',
        imageDescription:'This picture was taken when we were taken at Lumen, Monoroe, LA'
    },
    {
      id: 2,
      year: '2024-2024',
      company: 'University Of Louisiana at Monroe',
      title: 'Teaching Assistant',
      logo: '/images/ulm-logo.png',
      mainImage: '/images/withprokim.jpg',
      content: [
        'Building dynamic applications using Node.js and React.',
        'Implementing advanced state management with Redux.',
        'Securing API requests using OAuth and JWT tokens.',
      ],
      description:
        'As a Teaching Assistant, I supported students in understanding complex concepts in software engineering, particularly in Node.js and React.',
    },
    // Add more experiences with a similar structure
  ];
  
  export default experiences;
  