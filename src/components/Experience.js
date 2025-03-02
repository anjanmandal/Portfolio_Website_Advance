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
        `Resolved intermittent service status API failures in a high-traffic SaaS platform by diagnosing rate-limiting misconfigurations with API monitoring and log analysis, optimizing thresholds, and implementing dynamic API gateway scaling, reducing error rates by 30% and improving reliability by 40%.`,
        `Established CI/CD pipelines using Jenkins to streamline build, testing, and deployment processes, cutting deployment failures by 25% and accelerating release times by 30%.`,
        `Managed AWS services for 30+ clients, resolving scaling delays and outages with Docker containerization, Kubernetes on AWS EKS, and auto-scaling, achieving 99% uptime and cutting deployment times by 60%.`,
        `Eliminated N+1 query bottlenecks in applications serving 2,000+ clients by implementing eager loading and batch fetching with Entity Framework Core, Sequelize, and Mongoose, resulting in a 70% performance improvement.`,
        `Refactored Node.js applications to eliminate SQL injection vulnerabilities, enhancing data security by 75% through the implementation of ORM-based parameterized queries and strict input validation and enhancing authorization.`,
        
      ],
      description:
        'As a Software Engineering Intern at SquareplanIT, I enhanced system reliability by diagnosing API failures and optimizing rate limits. I streamlined deployment processes by setting up CI/CD pipelines and managed cloud infrastructure for multiple clients, ensuring scalability and uptime. Additionally, I improved database performance by optimizing queries and strengthened application security by mitigating SQL injection vulnerabilities.',
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
        `Increased student coding skills by 30% through regular LeetCode challenges in Java and Python and developed a visual application to demonstrate complex algorithms and data structures resulting in a 40% improvement in student grades.`,
        `Selected from 300 ULM Computer Science students for the Emerging Scholar Program, presented AI research on neural networks and machine learning at a symposium, and awarded a stipend for outstanding contributions.`
        
      ],
      description:
        'As an Emerging Scholar at ULM, I enhanced student coding proficiency by organizing regular LeetCode challenges and developing a visual application to simplify complex algorithms. I was selected from 300 Computer Science students for the Emerging Scholar Program, where I presented AI research on neural networks and machine learning at a symposium and received a stipend for outstanding contributions.',
        imageDescription:'This is a picture with my professor, Dr. Kim Taylor. I served as a teaching assistant in her class.'
    },
    {
      id: 3,
      year: '2021-2022',
      company: 'National Innovation Center',
      title: 'Software Engineering Intern',
      logo: '/images/NIC_logo.jpg',
      mainImage: '/images/NIC_picture.png',
      content: [
        `Designed custom JWT and session-based authentication with passport.js to resolve session management and token validation vulnerabilities, boosting system security by 40% and optimizing authentication and compliance.`,
        `Refactored and optimized legacy software built by a senior developer, employing NodeJS and Django to achieve a 30% performance increase and enhance security compliance with current best practices.`,
        `Developed and deployed 10+ startup applications using React.js, Node.js, and Vue.js, boosting production capacity by 40% through faster development and improved code maintainability.`
        
      ],
      description:
        `As a Software Developer, I designed secure authentication systems using JWT and session-based authentication with Passport.js, strengthening system security and compliance. I optimized legacy software by refactoring Node.js and Django applications, improving performance and security. Additionally, I developed and deployed multiple startup applications with React.js, Node.js, and Vue.js, enhancing production capacity and maintainability. `,
        imageDescription:'This is a picture taken during a visit from a news reporter who came to see our innovations.'
    },
    // Add more experiences with a similar structure
  ];
  
  export default experiences;
  