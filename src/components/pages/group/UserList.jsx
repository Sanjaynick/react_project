import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseconfig';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersArray = querySnapshot.docs.map(doc => doc.data());
        setUsers(usersArray);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            👤 {user.username} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
