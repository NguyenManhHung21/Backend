import axios from "axios";
import { Card } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);

  useState(() => {
    axios.get("/").then((res) => setCourses(res.data));
  }, []);
  return (
    <div className="grid gap-3 grid-cols-3 mt-5">
      {courses.map((course) => (
        <div key={course._id}>
          <Link className="inline-block" to={`/${course.slug}`}>
            <div className="max-w-sm">
              <Card  imgSrc={course.img}>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {course.name}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
              </Card>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
