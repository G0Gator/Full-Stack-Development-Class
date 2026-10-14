const express = require('express');

const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: 'course1', instructor: 'Mr. Smith', time: '10:00 AM' },
  { id: 2, name: 'course2', instructor: 'Ms. Jones', time: '1:00 PM' },
  { id: 3, name: 'course3', instructor: 'Dr. Lee', time: '3:00 PM' }
];

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course) {
    return res.status(404).send('The course with the given ID was not found.');
  }

  res.send(course);
});

app.post('/api/courses', (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name,
    instructor: req.body.instructor,
    time: req.body.time
  };

  courses.push(course);
  res.status(201).send(course);
});

app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course) {
    return res.status(404).send('The course with the given ID was not found.');
  }

  course.name = req.body.name;
  course.instructor = req.body.instructor;
  course.time = req.body.time;

  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course) {
    return res.status(404).send('The course with the given ID was not found.');
  }

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
