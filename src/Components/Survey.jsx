import { useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import { Button, Checkbox, FormControlLabel, Grid, CssBaseline, Box, Typography, TextField, FormHelperText, FormControl, Select, MenuItem, Avatar } from "@mui/material";
import TableChartIcon from '@mui/icons-material/TableChart';

const theme = createTheme({
  palette:{
    primary: {
      main: pink[900],
    },
  },
  typography: {
    subtitle: {
      fontSize: '0.8rem',
    },
  },
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright ©AntonelaRodriguez, '}
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    // measurementId: "G-EQZYCZR7P0"
};

firebase.initializeApp(firebaseConfig);

const Survey = () => {
  const [formState, setFormState] = useState({});
//   const history = useHistory();
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dbRef = firebase.database().ref("responses");
    dbRef.push(formState);
    setFormState({});
    alert("Form submitted!");
    navigate("/responses");
  };

  const jsonData = {
	"items": [
		{
			"type": "text",
			"label": "Nombre completo",
			"name": "full_name",
			"required": true
		},
		{
			"type": "email",
			"label": "Correo electrónico",
			"name": "email",
			"required": true
		},
		{
			"type": "date",
			"label": "Fecha de nacimiento",
			"name": "birth_date",
			"required": true
		},
		{
			"type": "select",
			"label": "¿Cuál es tu país de origen?",
			"name": "country_of_origin",
			"options": [
				{
					"label": "Argentina",
					"value": "argentina"
				},
				{
					"label": "Brasil",
					"value": "brasil"
				},
				{
					"label": "Chile",
					"value": "chile"
				},
				{
					"label": "Colombia",
					"value": "colombia"
				},
				{
					"label": "México",
					"value": "mexico"
				},
				{
					"label": "Perú",
					"value": "peru"
				},
				{
					"label": "Uruguay",
					"value": "uruguay"
				},
				{
					"label": "Venezuela",
					"value": "venezuela"
				}
			],
			"required": true
		},
		{
			"type": "checkbox",
			"label": "¿Acepta los términos y condiciones?",
			"name": "terms_and_conditions",
			"required": true
		},
		{
			"type": "submit",
			"label": "Enviar"
		}
	]
}

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} elevation={6} square backgroundColor={'#fbf2f0'}>
        <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <TableChartIcon />
          </Avatar>
        <Typography marginTop={'1.5rem'} component="h1" variant="h5">
          FILL YOUR INFORMATION
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} >
          {jsonData.items.map((item, index) => {
          switch (item.type) {
            case "text":
            case "email":
            case "date":
              return (
              <div key={index}>
                <TextField
                  type={item.type}
                  id={item.name}
                  name={item.name}
                  required={item.required}
                  value={formState[item.name] || ""}
                  onChange={handleChange}
                  helperText={item.label}
                  variant="standard"
                  color="primary"
                  focused
                />
                {/* <label htmlFor={item.name}>{item.label}</label>
                <input
                  type={item.type}
                  id={item.name}
                  name={item.name}
                  required={item.required}
                  value={formState[item.name] || ""}
                  onChange={handleChange}
                /> */}
              </div>
            );
          case "select":
            return (
              <div key={index}>
                <Box sx={{ minWidth: 120 }} >
                <FormControl variant="standard" color="primary" focused>
                <Select
                  value={formState[item.name] || ""}
                  id={item.name}
                  name={item.name}
                  required={item.required}
                  onChange={handleChange}
                  helperText={item.label}
                  
                >
                  <MenuItem value="">Seleccione una opción</MenuItem>
                  {item.options.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{item.label}</FormHelperText>
                </FormControl>
                </Box>
                {/* <label htmlFor={item.name}>{item.label}</label>
                <select
                  id={item.name}
                  name={item.name}
                  required={item.required}
                  value={formState[item.name] || ""}
                  onChange={handleChange}
                >
                  <option value="">--Seleccione una opción--</option>
                  {item.options.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select> */}
              </div>
            );
          case "checkbox":
            return (
              <div key={index}>
                <FormControlLabel
                  control={<Checkbox 
                    id={item.name}
                    name={item.name}
                    required={item.required}
                    checked={formState[item.name]}
                    onChange={(e) =>
                      setFormState((prevState) => ({
                        ...prevState,
                        [item.name]: e.target.checked,
                      }))
                    }
                    size="small"
                  />}
                  label={item.label}
                />
                {/* <label htmlFor={item.name}>
                  <input
                    type="checkbox"
                    id={item.name}
                    name={item.name}
                    required={item.required}
                    checked={formState[item.name]}
                    onChange={(e) =>
                      setFormState((prevState) => ({
                        ...prevState,
                        [item.name]: e.target.checked,
                      }))
                    }
                  />
                  {item.label}
                </label> */}
              </div>
            );
          case "submit":
            return (
              <Box marginTop={'2rem'}>
              <Button variant="contained" color="primary" key={index} type="submit" >
                {item.label}
              </Button>
              </Box>
            );
          default:
            return null;
        }
      })}
      </Box>
      <Copyright sx={{ mt: 2 }}/>
        </Box>
      </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default Survey