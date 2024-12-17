import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import "./Profile.css"

const Profile = () => {
  const {authUser} = useAuth()
  const [role, setRole] = useState('')
  const [skills, setSkills] = useState('')
  const [interest, setInterset] = useState('')
  const [bio, setBio] = useState('')
  const [isEditing, setIsEditing] = useState(false);

  useEffect(()=> {
    if (authUser) {
      axios.get(`http://localhost:3000/api/v1/profile/${authUser.id}`)
      .then((response) => {
        const {role, skills, interest, bio} = response.data
        setRole(role || '')
        setSkills(skills || '')
        setInterset(interest || '')
        setBio(bio || '')
        setIsEditing(true)
      })
      .catch((error) => {
        console.log("Error fetching Profile:", error)
        setIsEditing(false)
      })
    }
  }, [authUser])


  const handleSave = async () => {
    const profileData = {role, skills, interest, bio};
    try {
      const response = await axios.post("http://localhost:3000/api/v1/profile", {...profileData, userId: authUser.id})
      alert('Profile saved successfully!')

    } catch (error) {
      console.log("Error fetching Profile:", error)
    }
  }

  return (
    <div className="profile-container">
    <h1>{isEditing ? 'Edit Profile' : 'Create Profile'}</h1>
    <div className="form-group">
      <label>Role:</label>
      <input
        type="text"
        placeholder="Enter your role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label>Skills:</label>
      <input
        type="text"
        placeholder="Enter your skills"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label>Interest:</label>
      <textarea
        type="text"
        placeholder="Enter your interest"
        value={interest}
        onChange={(e) => setInterset(e.target.value)}
      ></textarea>
    </div>
    <div className="form-group">
      <label>Bio:</label>
      <textarea
        placeholder="Write a short bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      ></textarea>
    </div>
    <button className="save-button" onClick={handleSave}>
      Save Profile
    </button>
  </div>
  )
}

export default Profile