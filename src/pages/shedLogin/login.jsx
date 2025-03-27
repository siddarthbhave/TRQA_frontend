import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/actions';
import { TextField, MenuItem, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../context/ContextProvider';

const ShedLogin = () => {
  const [name, setName] = useState('');
  const [shedId, setShedId] = useState(''); // State for shed ID
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { setIsLoading } = useStateContext();
  const navigate = useNavigate();
  const [sheds, setSheds] = useState([]);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_URL}/login/`, {
        username: name,
        password: password,
      });

      if (response.status === 200) {
        const role = name === 'QA' ? 'admin' : 'shed'; // Determine the role

        // Dispatch the login success action with shed ID
        dispatch(loginSuccess(name, role, shedId));

        setIsLoading(true);
        // Redirect based on role
        if (role === 'shed') {
          setTimeout(() => {
            setIsLoading(false);
            navigate('/transport-history');
          }, 2000);
        } else {
          setTimeout(() => {
            setIsLoading(false);
            navigate('/home');
          }, 2000);
        }
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error(error.response.data.error);
      setError(error.response.data.error);
    }
  };

  useEffect(() => {
    const fetchSheds = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/shed-details/`);
        console.log(`${import.meta.env.VITE_APP_URL}/shed-details/`)
        console.log(response)
        setSheds(response.data?.shed_details);
      } catch (error) {
        console.error('Error fetching sheds:', error);
      }
    };

    fetchSheds();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: 3,
        }}
      >
        <div>
          <ToastContainer />
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              select
              autoFocus
              value={shedId} // Use shedId here
              onChange={(e) => {
                setShedId(e.target.value); // Set the selected shed ID
                const selectedShed = sheds.find((shed) => shed.shed_id === e.target.value);
                setName(selectedShed ? selectedShed.name : ''); // Set the name based on shed ID
              }}
            >
              {sheds?.map((shed) => (
                <MenuItem key={shed.shed_id} value={shed.shed_id}>
                  {shed.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
            >
              Login
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default ShedLogin;
