import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

const Responses = () => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const dbRef = firebase.database().ref("responses");
    dbRef.on("value", (snapshot) => {
      const data = snapshot.val();
      const responseArray = [];
      for (let key in data) {
        responseArray.push({ key, ...data[key] });
      }
      setResponses(responseArray);
    });
  }, []);

  return (
    <div>
      <h2>Responses:</h2>
      {responses.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Birth Date</th>
              <th>Country of Origin</th>
              <th>Terms and Conditions</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((response) => (
              <tr key={response.key}>
                <td>{response.full_name}</td>
                <td>{response.email}</td>
                <td>{response.birth_date}</td>
                <td>{response.country_of_origin}</td>
                <td>{response.terms_and_conditions ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No responses yet.</p>
      )}
    </div>
  );
};

export default Responses;