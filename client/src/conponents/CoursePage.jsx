import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function CoursePage() {
  const { slug } = useParams();
  const [course, setCourse] = useState({});
  useEffect(() => {
    axios.get(`/${slug}`).then((res) => setCourse(res.data));
  }, [slug]);
  return (
    <div className="mt-4">
      <div className="row">
        <div className="col-lg-3">
        </div>
        <div className="col-lg-9">
          <h2>{course.name}</h2>
          
          <p></p>
        </div>
      </div>
    </div>
  );
}
