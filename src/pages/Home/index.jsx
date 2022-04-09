import { useState, useEffect } from "react";

import "./styles.css";

import { Card } from "../../components/Card";

export function Home() {
  // armazenar valores que refletem na interface;
  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [user, setUser] = useState({ name: "", avatar: "" });

  function handleAddStudent() {
    const newStudent = {
      id: Math.random() * 100,
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    setStudents((prevState) => [...prevState, newStudent]);
    // ['Rodrigo', 'Henrique']
  }

  function handleDeleteUser(id) {
    setStudents(students.filter((student) => student.id != id));
  }

  async function fetchData() {
    const response = await fetch("https://api.github.com/users/lhenriquedev");
    const data = await response.json();
    setUser({
      name: data.name,
      avatar: data.avatar_url,
    });
  }

  useEffect(() => {
    fetchData();
  }, [students]);

  return (
    <>
      <div className="container">
        <header>
          <h2>Lista de presença</h2>
          <div>
            <strong>{user.name}</strong>
            <img src={user.avatar} alt="Foto de perfil do github" />
          </div>
        </header>
        <input
          type="text"
          placeholder="Digite um nome"
          onChange={(e) => setStudentName(e.target.value)}
        />
        <button
          className="button-home"
          disabled={!studentName}
          type="button"
          onClick={handleAddStudent}
        >
          Cadastrar
        </button>

        {students.map((student) => (
          <Card
            key={student.id}
            name={student.name}
            time={student.time}
            handleDeleteUser={() => handleDeleteUser(student.id)}
          />
        ))}
      </div>
    </>
  );
}
