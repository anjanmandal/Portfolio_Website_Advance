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
        `Elevated student coding proficiency by 30% by conducting regular hard and medium LeetCode challenges in 
        Java, Python, and JavaScript using object-oriented programming over one semester, resulting in a 40% 
        improvement in grades. `,
        `Selected for the competitive Emerging Scholar Program from a pool of 400 junior and senior students at ULM's 
        Computer Science department and awarded a stipend for exemplary research contributions in artificial 
        intelligence. `,
        'Mentored students as a Teaching Assistant by simplifying complex concepts in Python, Java, and OOP, boosting coding proficiency by 30% and improving exam scores by 40%',
      ],
      description:
        'As a Teaching Assistant, I supported students in understanding complex concepts in software engineering, particularly in Node.js and React.',
    },
    {
      id: 2,
      year: '2021-2022',
      company: 'National Innovation Center',
      title: 'Software Engineering Intern',
      logo: '/images/NIC_logo.jpg',
      mainImage: '/images/NIC_picture.png',
      content: [
        `Improved overall security for multiple companies by 40% by implementing strong security packages for SPA 
        such as Sanctum, fortify, OAuth, and secure session management with cookies and JWT.  `,
        `Enhanced system integrity by developing custom security features that detected and mitigated malicious activities 
        such as form submission attacks, leading to significant prevention of unauthorized access and data breaches.  `,
         `Developed automated testing frameworks using Selenium and JUnit, reducing deployment times and minimizing 
        downtime by 30%.`,
      ],
      description:
        `As a software engineering intern, I developed and deployed 10+ startup applications using React.js, Node.js, and Vue.js, boosting production 
        capacity by 40% through faster development and improved code maintainability. `,
    },
    // Add more experiences with a similar structure
  ];
  
  export default experiences;
  